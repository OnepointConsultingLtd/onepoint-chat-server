# PDF to Markdown Converter

A comprehensive Python script for converting PDF files to markdown format with support for text extraction, table conversion, image extraction, and metadata preservation.

## Features

- **Multiple PDF Libraries**: Supports PyMuPDF, pdfplumber, and pymupdf4llm for maximum compatibility
- **Text Extraction**: Clean text extraction with proper formatting
- **Table Conversion**: Automatic table detection and markdown table conversion
- **Image Extraction**: Extract and link images from PDFs
- **Metadata Preservation**: Document metadata including author, title, creation date
- **Batch Processing**: Convert multiple PDFs at once
- **Flexible Output**: Custom output paths and directories

## Installation

1. Install Python dependencies:

```bash
pip install -r requirements_pdf.txt
```

2. Make the script executable (optional):

```bash
chmod +x pdf_to_markdown.py
```

## Usage

### Basic Usage

Convert a single PDF:

```bash
python pdf_to_markdown.py document.pdf
```

Convert with custom output:

```bash
python pdf_to_markdown.py document.pdf -o output.md
```

### Batch Processing

Convert multiple PDFs:

```bash
python pdf_to_markdown.py *.pdf --batch
```

Convert with custom output directory:

```bash
python pdf_to_markdown.py *.pdf --batch -d my_output_folder
```

### Advanced Options

Skip image extraction:

```bash
python pdf_to_markdown.py document.pdf --no-images
```

Force specific PDF library:

```bash
python pdf_to_markdown.py document.pdf --library pymupdf
```

## Output Structure

The converter creates:

- **Markdown files**: Clean, formatted markdown with proper headings and structure
- **Images folder**: Extracted images (if enabled) in `images/` subdirectory
- **Metadata**: Document information preserved in markdown headers

## Supported PDF Libraries

1. **pymupdf4llm** (Recommended): Best for LLM-optimized markdown conversion
2. **PyMuPDF**: Fast and reliable with good image extraction
3. **pdfplumber**: Excellent table extraction capabilities

The script automatically tries libraries in order of preference and falls back to alternatives if needed.

## Examples

### Convert a single PDF

```bash
python pdf_to_markdown.py "Technical Manual.pdf"
# Output: converted_pdfs/Technical Manual.md
```

### Batch convert with images

```bash
python pdf_to_markdown.py *.pdf --batch
# Output: converted_pdfs/ folder with all markdown files and images/
```

### Convert to specific location

```bash
python pdf_to_markdown.py report.pdf -o reports/converted_report.md
```

## Troubleshooting

### Common Issues

1. **No PDF libraries available**:

   ```bash
   pip install PyMuPDF pdfplumber pymupdf4llm
   ```

2. **Image extraction fails**:

   ```bash
   pip install Pillow
   ```

3. **Permission errors**:
   - Ensure write permissions to output directory
   - Run with appropriate user permissions

### Library-Specific Notes

- **PyMuPDF**: Best overall performance and image extraction
- **pdfplumber**: Excellent for documents with complex tables
- **pymupdf4llm**: Optimized for LLM training data preparation

## Output Format

The generated markdown includes:

```markdown
# Document Title

## Document Information

- **File**: document.pdf
- **Converted**: 2024-01-15 10:30:00
- **Pages**: 25
- **Author**: John Doe
- **Subject**: Technical Documentation

---

## Content

### Page 1

[Extracted text content...]

### Tables

[Converted tables in markdown format...]

## Images

![Image from page 1](images/document_page_1_img_1.png)
```

## Performance Tips

1. **Large PDFs**: Use `--no-images` for faster processing of text-only documents
2. **Batch processing**: Use `--batch` for multiple files to avoid repeated library initialization
3. **Memory usage**: For very large PDFs, consider processing page by page

## License

This script is provided as-is for educational and personal use. Please ensure you have appropriate rights to convert any PDF documents.
