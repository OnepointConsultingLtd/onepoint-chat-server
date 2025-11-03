#!/usr/bin/env python3
"""
PDF to Markdown Converter

This script converts PDF files to markdown format with support for:
- Text extraction with proper formatting
- Table extraction and conversion
- Image extraction and linking
- Metadata preservation
- Batch processing
- Multiple PDF libraries for better compatibility

Usage:
    python pdf_to_markdown.py input.pdf
    python pdf_to_markdown.py input.pdf -o output.md
    python pdf_to_markdown.py *.pdf --batch
"""

import os
import sys
import argparse
import re
from pathlib import Path
from datetime import datetime
from typing import List, Optional, Dict, Any
import json

# PDF processing libraries
try:
    import fitz  # PyMuPDF
    PYMUPDF_AVAILABLE = True
except ImportError:
    PYMUPDF_AVAILABLE = False

try:
    import pdfplumber
    PDFPLUMBER_AVAILABLE = True
except ImportError:
    PDFPLUMBER_AVAILABLE = False

try:
    import pymupdf4llm
    PYMUPDF4LLM_AVAILABLE = True
except ImportError:
    PYMUPDF4LLM_AVAILABLE = False

# Image processing
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

class PDFToMarkdownConverter:
    def __init__(self, output_dir: str = "converted_pdfs", extract_images: bool = True):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.extract_images = extract_images
        self.images_dir = self.output_dir / "images"
        if self.extract_images:
            self.images_dir.mkdir(exist_ok=True)
        
        # Check available libraries
        self.available_libraries = []
        if PYMUPDF_AVAILABLE:
            self.available_libraries.append("pymupdf")
        if PDFPLUMBER_AVAILABLE:
            self.available_libraries.append("pdfplumber")
        if PYMUPDF4LLM_AVAILABLE:
            self.available_libraries.append("pymupdf4llm")
            
        if not self.available_libraries:
            raise ImportError("No PDF processing libraries available. Please install PyMuPDF, pdfplumber, or pymupdf4llm")
    
    def extract_text_pymupdf(self, pdf_path: Path) -> Dict[str, Any]:
        """Extract text using PyMuPDF (fitz)"""
        doc = fitz.open(pdf_path)
        content = {
            'text': '',
            'metadata': doc.metadata,
            'pages': [],
            'images': []
        }
        
        for page_num in range(len(doc)):
            page = doc[page_num]
            page_text = page.get_text()
            
            # Extract images if enabled
            if self.extract_images:
                image_list = page.get_images()
                for img_index, img in enumerate(image_list):
                    try:
                        xref = img[0]
                        pix = fitz.Pixmap(doc, xref)
                        if pix.n - pix.alpha < 4:  # GRAY or RGB
                            img_name = f"{pdf_path.stem}_page_{page_num + 1}_img_{img_index + 1}.png"
                            img_path = self.images_dir / img_name
                            pix.save(str(img_path))
                            content['images'].append({
                                'page': page_num + 1,
                                'filename': img_name,
                                'path': str(img_path.relative_to(self.output_dir))
                            })
                        pix = None
                    except Exception as e:
                        print(f"Warning: Could not extract image {img_index} from page {page_num + 1}: {e}")
            
            content['pages'].append({
                'page_number': page_num + 1,
                'text': page_text
            })
            content['text'] += page_text + '\n\n'
        
        doc.close()
        return content
    
    def extract_text_pdfplumber(self, pdf_path: Path) -> Dict[str, Any]:
        """Extract text using pdfplumber"""
        content = {
            'text': '',
            'metadata': {},
            'pages': [],
            'images': []
        }
        
        with pdfplumber.open(pdf_path) as pdf:
            # Extract metadata
            if hasattr(pdf, 'metadata') and pdf.metadata:
                content['metadata'] = pdf.metadata
            
            for page_num, page in enumerate(pdf.pages):
                page_text = page.extract_text() or ""
                
                # Extract tables
                tables = page.extract_tables()
                table_markdown = ""
                if tables:
                    table_markdown = "\n\n### Tables\n\n"
                    for table in tables:
                        if table:
                            table_markdown += self._convert_table_to_markdown(table)
                            table_markdown += "\n\n"
                
                content['pages'].append({
                    'page_number': page_num + 1,
                    'text': page_text,
                    'tables': table_markdown
                })
                content['text'] += page_text + '\n\n' + table_markdown
        
        return content
    
    def extract_text_pymupdf4llm(self, pdf_path: Path) -> Dict[str, Any]:
        """Extract text using pymupdf4llm"""
        try:
            markdown_text = pymupdf4llm.to_markdown(str(pdf_path))
            return {
                'text': markdown_text,
                'metadata': {},
                'pages': [{'page_number': 1, 'text': markdown_text}],
                'images': []
            }
        except Exception as e:
            print(f"Warning: pymupdf4llm failed: {e}")
            return None
    
    def _convert_table_to_markdown(self, table: List[List[str]]) -> str:
        """Convert table data to markdown format"""
        if not table or not table[0]:
            return ""
        
        # Clean table data
        cleaned_table = []
        for row in table:
            cleaned_row = []
            for cell in row:
                if cell is None:
                    cleaned_row.append("")
                else:
                    # Clean cell content
                    cell_text = str(cell).strip().replace('\n', ' ').replace('\r', ' ')
                    cleaned_row.append(cell_text)
            cleaned_table.append(cleaned_row)
        
        if not cleaned_table:
            return ""
        
        # Create markdown table
        markdown_lines = []
        
        # Header row
        header = cleaned_table[0]
        markdown_lines.append("| " + " | ".join(header) + " |")
        markdown_lines.append("| " + " | ".join(["---"] * len(header)) + " |")
        
        # Data rows
        for row in cleaned_table[1:]:
            if len(row) == len(header):  # Only add rows with correct number of columns
                markdown_lines.append("| " + " | ".join(row) + " |")
        
        return "\n".join(markdown_lines)
    
    def clean_text(self, text: str) -> str:
        """Clean and format extracted text"""
        # Remove excessive whitespace
        text = re.sub(r'\n\s*\n\s*\n', '\n\n', text)
        
        # Fix common PDF extraction issues
        text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)  # Add space between camelCase
        text = re.sub(r'(\w)(\d)', r'\1 \2', text)  # Add space between word and number
        
        # Clean up bullet points
        text = re.sub(r'^\s*[•·▪▫]\s*', '- ', text, flags=re.MULTILINE)
        
        # Clean up numbered lists
        text = re.sub(r'^\s*(\d+)[.)]\s*', r'\1. ', text, flags=re.MULTILINE)
        
        return text.strip()
    
    def format_as_markdown(self, content: Dict[str, Any], pdf_path: Path) -> str:
        """Format extracted content as markdown"""
        # Extract title from filename or metadata
        title = pdf_path.stem.replace('_', ' ').replace('-', ' ').title()
        if content.get('metadata', {}).get('title'):
            title = content['metadata']['title']
        
        markdown = f"# {title}\n\n"
        
        # Add metadata section
        markdown += "## Document Information\n\n"
        markdown += f"- **File**: {pdf_path.name}\n"
        markdown += f"- **Converted**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        markdown += f"- **Pages**: {len(content.get('pages', []))}\n"
        
        if content.get('metadata'):
            metadata = content['metadata']
            if metadata.get('author'):
                markdown += f"- **Author**: {metadata['author']}\n"
            if metadata.get('subject'):
                markdown += f"- **Subject**: {metadata['subject']}\n"
            if metadata.get('creator'):
                markdown += f"- **Creator**: {metadata['creator']}\n"
            if metadata.get('producer'):
                markdown += f"- **Producer**: {metadata['producer']}\n"
        
        markdown += "\n---\n\n"
        
        # Add main content
        markdown += "## Content\n\n"
        
        # Process each page
        for page_data in content.get('pages', []):
            page_num = page_data.get('page_number', 1)
            page_text = page_data.get('text', '')
            
            if page_text.strip():
                # Add page header for multi-page documents
                if len(content.get('pages', [])) > 1:
                    markdown += f"### Page {page_num}\n\n"
                
                # Clean and add text
                cleaned_text = self.clean_text(page_text)
                if cleaned_text:
                    markdown += cleaned_text + "\n\n"
                
                # Add tables if present
                if 'tables' in page_data and page_data['tables']:
                    markdown += page_data['tables']
        
        # Add images section if any were extracted
        if content.get('images'):
            markdown += "\n## Images\n\n"
            for img in content['images']:
                markdown += f"![Image from page {img['page']}]({img['path']})\n\n"
        
        return markdown
    
    def convert_pdf(self, pdf_path: Path, output_path: Optional[Path] = None) -> bool:
        """Convert a single PDF to markdown"""
        try:
            print(f"Converting: {pdf_path.name}")
            
            # Try different extraction methods
            content = None
            
            # Try pymupdf4llm first (best for markdown conversion)
            if PYMUPDF4LLM_AVAILABLE and not content:
                print("  Using pymupdf4llm...")
                content = self.extract_text_pymupdf4llm(pdf_path)
            
            # Fallback to PyMuPDF
            if not content and PYMUPDF_AVAILABLE:
                print("  Using PyMuPDF...")
                content = self.extract_text_pymupdf(pdf_path)
            
            # Fallback to pdfplumber
            if not content and PDFPLUMBER_AVAILABLE:
                print("  Using pdfplumber...")
                content = self.extract_text_pdfplumber(pdf_path)
            
            if not content:
                print(f"  ❌ Failed to extract content from {pdf_path.name}")
                return False
            
            # Generate output path
            if not output_path:
                output_path = self.output_dir / f"{pdf_path.stem}.md"
            
            # Format as markdown
            markdown_content = self.format_as_markdown(content, pdf_path)
            
            # Save to file
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            
            print(f"  ✅ Saved: {output_path.name}")
            return True
            
        except Exception as e:
            print(f"  ❌ Error converting {pdf_path.name}: {e}")
            return False
    
    def convert_batch(self, pdf_files: List[Path]) -> Dict[str, int]:
        """Convert multiple PDF files"""
        results = {'success': 0, 'failed': 0}
        
        print(f"\nConverting {len(pdf_files)} PDF files...")
        print("=" * 50)
        
        for pdf_path in pdf_files:
            if self.convert_pdf(pdf_path):
                results['success'] += 1
            else:
                results['failed'] += 1
        
        return results

def main():
    parser = argparse.ArgumentParser(description="Convert PDF files to Markdown format")
    parser.add_argument("input", nargs="+", help="PDF file(s) to convert")
    parser.add_argument("-o", "--output", help="Output file path (for single file)")
    parser.add_argument("-d", "--output-dir", default="converted_pdfs", help="Output directory for batch conversion")
    parser.add_argument("--batch", action="store_true", help="Batch mode for multiple files")
    parser.add_argument("--no-images", action="store_true", help="Skip image extraction")
    parser.add_argument("--library", choices=["pymupdf", "pdfplumber", "pymupdf4llm"], help="Force specific PDF library")
    
    args = parser.parse_args()
    
    # Check if input files exist
    pdf_files = []
    for input_path in args.input:
        path = Path(input_path)
        if path.exists() and path.suffix.lower() == '.pdf':
            pdf_files.append(path)
        else:
            print(f"Warning: {input_path} is not a valid PDF file")
    
    if not pdf_files:
        print("No valid PDF files found")
        return 1
    
    # Initialize converter
    try:
        converter = PDFToMarkdownConverter(
            output_dir=args.output_dir,
            extract_images=not args.no_images
        )
    except ImportError as e:
        print(f"Error: {e}")
        print("\nPlease install required dependencies:")
        print("pip install PyMuPDF pdfplumber pymupdf4llm")
        return 1
    
    print(f"Available PDF libraries: {', '.join(converter.available_libraries)}")
    
    # Convert files
    if len(pdf_files) == 1 and not args.batch and args.output:
        # Single file with specific output
        success = converter.convert_pdf(pdf_files[0], Path(args.output))
        return 0 if success else 1
    else:
        # Batch conversion
        results = converter.convert_batch(pdf_files)
        
        print("\n" + "=" * 50)
        print("Conversion Summary:")
        print(f"Successfully converted: {results['success']}")
        print(f"Failed conversions: {results['failed']}")
        print(f"Output directory: {converter.output_dir}")
        
        return 0 if results['failed'] == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
