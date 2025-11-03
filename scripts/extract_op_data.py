import os
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from tqdm import tqdm
import time
from datetime import datetime
import re
from urllib.parse import urljoin, urlparse
import mimetypes

"""
This script is used to scrape the Onepoint website and save the data to a Markdown file.

It uses both requests and Selenium to scrape the data.

It also uses the BeautifulSoup library to parse the HTML and extract the data.

"""


def print_header():
    print("\n" + "="*80)
    print("Onepoint Website Scraper")
    print("="*80 + "\n")
    print(f"Starting extraction at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Total URLs to process: {len(urls_to_scrape)}")
    print("-"*80 + "\n")

def print_footer(start_time):
    duration = time.time() - start_time
    print("\n" + "-"*80)
    print(f"Extraction completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Total duration: {duration:.2f} seconds")
    print("="*80 + "\n")

# Function to scrape using requests
def scrape_page_requests(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=30)
        if response.status_code == 200:
            return parse_html_to_markdown(response.content, url)
        else:
            print(f"\n❌ Failed to scrape {url} with requests (Status: {response.status_code})")
            return None
    except Exception as e:
        print(f"\n❌ Error scraping {url} with requests: {str(e)}")
        return None

# Function to scrape using Selenium (for JavaScript-rendered pages)
def scrape_page_selenium(url):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        driver.get(url)
        content = driver.page_source
        return parse_html_to_markdown(content, url)
    except Exception as e:
        print(f"\n❌ Error scraping {url} with Selenium: {str(e)}")
        return None
    finally:
        driver.quit()

# Convert HTML to Markdown format
def parse_html_to_markdown(html, url):
    soup = BeautifulSoup(html, "html.parser")
    
    # Extract title and create header
    title = soup.title.string.strip() if soup.title else url.split('/')[-1]
    markdown = f"# {title}\n\n"
    markdown += f"Source: {url}\n\n"
    
    # Extract meta description if available
    meta_desc = soup.find('meta', {'name': 'description'})
    if meta_desc and meta_desc.get('content'):
        markdown += f"*{meta_desc['content']}*\n\n"
    
    # Main content
    markdown += "## Content\n\n"
    
    # Track citations
    citations = []
    citation_count = 0
    
    # Ensure assets directory exists
    assets_dir = os.path.join("scraped_data", "assets")
    os.makedirs(assets_dir, exist_ok=True)
    
    def is_asset_url(href):
        if not href:
            return False
        parsed = urlparse(href)
        path = parsed.path.lower()
        asset_exts = (
            ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
            ".mp4", ".webm", ".ogg", ".mov", ".avi",
            ".mp3", ".wav", ".m4a", ".flac",
            ".pdf"
        )
        return any(path.endswith(ext) for ext in asset_exts)
    
    def add_citation(text, link):
        nonlocal citation_count
        citation_count += 1
        citations.append(f"[{citation_count}] {text}: {link}")
        return citation_count
    
    for element in soup.find_all(["h1", "h2", "h3", "p", "ul", "ol", "li", "a", "blockquote", "img", "video", "audio", "iframe"]):
        if element.name.startswith("h"):  # Headings
            level = int(element.name[1])
            # Skip the main title as it's already handled
            if level == 1:
                continue
            markdown += f"{'#' * level} {element.get_text(strip=True)}\n\n"
        elif element.name == "p":  # Paragraphs
            text = element.get_text(strip=True)
            if text:
                markdown += f"{text}\n\n"
        elif element.name == "ul":  # Unordered lists
            for li in element.find_all("li"):
                markdown += f"- {li.get_text(strip=True)}\n"
            markdown += "\n"
        elif element.name == "ol":  # Ordered lists
            for idx, li in enumerate(element.find_all("li"), start=1):
                markdown += f"{idx}. {li.get_text(strip=True)}\n"
            markdown += "\n"
        elif element.name == "a" and element.get_text(strip=True):  # Links
            raw_href = element.get("href", "")
            text = element.get_text(strip=True)
            resolved_href = urljoin(url, raw_href)
            if is_asset_url(resolved_href):
                local_rel = download_file(resolved_href)
                local_link = local_rel if local_rel else resolved_href
                # Preserve structure: external links use citations; otherwise inline
                if raw_href.startswith('http'):
                    idx = add_citation(text, local_link)
                    markdown += f"{text}[{idx}]\n\n"
                else:
                    markdown += f"[{text}]({local_link})\n\n"
            else:
                if resolved_href.startswith('http'):
                    idx = add_citation(text, resolved_href)
                    markdown += f"{text}[{idx}]\n\n"
                else:
                    markdown += f"[{text}]({resolved_href})\n\n"
        elif element.name == "blockquote":  # Blockquotes
            text = element.get_text(strip=True)
            if text:
                markdown += f"> {text}\n\n"
        elif element.name == "img":  # Images
            src = element.get("src")
            alt = element.get("alt", "")
            resolved_src = urljoin(url, src) if src else None
            if resolved_src:
                local_rel = download_file(resolved_src)
                if local_rel:
                    markdown += f"![{alt}]({local_rel})\n\n"
                else:
                    markdown += f"![{alt}]({resolved_src})\n\n"
        elif element.name == "video":  # Videos
            # Prefer <source> child, fallback to src
            source_tag = element.find("source")
            src = source_tag.get("src") if source_tag and source_tag.get("src") else element.get("src")
            resolved_src = urljoin(url, src) if src else None
            if resolved_src:
                local_rel = download_file(resolved_src)
                link_target = local_rel if local_rel else resolved_src
                markdown += f"[Video]({link_target})\n\n"
        elif element.name == "audio":  # Audios
            source_tag = element.find("source")
            src = source_tag.get("src") if source_tag and source_tag.get("src") else element.get("src")
            resolved_src = urljoin(url, src) if src else None
            if resolved_src:
                local_rel = download_file(resolved_src)
                link_target = local_rel if local_rel else resolved_src
                markdown += f"[Audio]({link_target})\n\n"
        elif element.name == "iframe":  # Iframes
            src = element.get("src")
            resolved_src = urljoin(url, src) if src else None
            if resolved_src:
                hostname = urlparse(resolved_src).hostname or ""
                # For YouTube/Vimeo/other embeds, just add a clickable link
                if any(h in hostname for h in ["youtube.com", "youtu.be", "vimeo.com"]):
                    markdown += f"[Embedded content]({resolved_src})\n\n"
                else:
                    # Try to download if it's a direct asset, otherwise just link
                    if is_asset_url(resolved_src):
                        local_rel = download_file(resolved_src)
                        link_target = local_rel if local_rel else resolved_src
                        markdown += f"[Embedded content]({link_target})\n\n"
                    else:
                        markdown += f"[Embedded content]({resolved_src})\n\n"
    
    # Add citations section if there are any
    if citations:
        markdown += "\n## Sources\n\n"
        for citation in citations:
            markdown += f"{citation}\n"
    
    # Add metadata section
    markdown += "\n## Metadata\n\n"
    markdown += f"- URL: {url}\n"
    markdown += f"- Last Scraped: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
    markdown += f"- Content Type: {'PDF' if url.lower().endswith('.pdf') else 'Web Page'}\n"
    
    return markdown

# Helper to download and save media assets into scraped_data/assets
def download_file(asset_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        assets_dir = os.path.join("scraped_data", "assets")
        os.makedirs(assets_dir, exist_ok=True)
        parsed = urlparse(asset_url)
        basename = os.path.basename(parsed.path)
        # Fallback filename if empty
        if not basename:
            basename = "asset"
        # Ensure extension
        name, ext = os.path.splitext(basename)
        if not ext:
            try:
                head_resp = requests.head(asset_url, headers=headers, timeout=20, allow_redirects=True)
                content_type = head_resp.headers.get("Content-Type", "").split(";")[0].strip()
                guessed_ext = mimetypes.guess_extension(content_type) if content_type else None
                if guessed_ext:
                    ext = guessed_ext
            except Exception:
                pass
        # Sanitize filename
        safe_name = re.sub(r'[^\w\-_.]', '_', name)[:80]
        filename = f"{safe_name}{ext}" if ext else safe_name
        # Ensure unique filename
        final_path = os.path.join(assets_dir, filename)
        counter = 1
        while os.path.exists(final_path):
            filename_try = f"{safe_name}_{counter}{ext}"
            final_path = os.path.join(assets_dir, filename_try)
            counter += 1
        # Download
        with requests.get(asset_url, headers=headers, timeout=60, stream=True) as r:
            if r.status_code != 200:
                print(f"\n❌ Failed to download asset: {asset_url} (Status: {r.status_code})")
                return None
            r.raise_for_status()
            with open(final_path, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
        # Return relative path from markdown location (scraped_data/*.md) to assets
        rel_path = os.path.join("assets", os.path.basename(final_path)).replace('\\', '/')
        return rel_path
    except Exception as e:
        print(f"\n❌ Error downloading asset {asset_url}: {str(e)}")
        return None

# Save content to a Markdown file
def save_to_markdown(content, filename):
    with open(filename, "w", encoding="utf-8") as file:
        file.write(content)

def generate_filename(url):
    """Generate a unique filename for a URL"""
    # Remove protocol and domain
    path = url.replace("https://www.onepointltd.com", "").replace("http://www.onepointltd.com", "")
    
    # Remove trailing slash
    if path.endswith('/'):
        path = path[:-1]
    
    # If path is empty (homepage), use 'home'
    if not path:
        path = 'home'
    
    # Remove leading slash
    if path.startswith('/'):
        path = path[1:]
    
    # Replace slashes with underscores and clean up
    filename = path.replace('/', '_').replace(' ', '_').replace('-', '_')
    
    # Remove any special characters that might cause issues
    filename = re.sub(r'[^\w\-_.]', '', filename)
    
    # Ensure filename is not too long
    if len(filename) > 100:
        filename = filename[:100]
    
    return filename + ".md"

# List of URLs to scrape
urls_to_scrape = [
    # Main pages
   
"https://www.onepointltd.com/",
"https://www.onepointltd.com/boomi/",
"https://www.onepointltd.com/contact-us/",
"https://www.onepointltd.com/data-wellness/",
"https://www.onepointltd.com/discover-onepoint/",
"https://www.onepointltd.com/discover-onepoint/meet-our-team/",
"https://www.onepointltd.com/discover-onepoint/meet-our-team/shashin-shah/",
"https://www.onepointltd.com/data-wellness/onepoint-d-well/",
"https://www.onepointltd.com/onepoint-res-ai/",
"https://www.onepointltd.com/data-wellness/onepoint-d-wise/",
"https://www.onepointltd.com/data-wellness/rapid-health-check/",
"https://www.onepointltd.com/data-wellness/transformation-roadmap/",
"https://www.onepointltd.com/architect-for-outcomes/",
"https://www.onepointltd.com/onepoint-labs/",
"https://www.onepointltd.com/innovate-with-ai-more/",
"https://www.onepointltd.com/techtalk/",
"https://www.onepointltd.com/client-stories/",
"https://www.onepointltd.com/do-data-better/",
"https://www.onepointltd.com/techtalk/ai-and-master-data-management-a-synergy-for-success/",
"https://www.onepointltd.com/techtalk/fundamentals-of-large-language-models/",
"https://www.onepointltd.com/techtalk/the-future-of-enterprise-data-access/",
"https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-direct-interactions/",
"https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-part-2-workflows-and-complex-interactions/",
"https://www.onepointltd.com/techtalk/unlocking-the-power-of-real-time-data/",
"https://www.onepointltd.com/wp-content/uploads/2024/09/Terms-of-Use-for-Onepoint-D-Well%E2%84%A2-The-Data-Wellness-Companion.pdf",
"https://www.onepointltd.com/wp-content/uploads/2024/09/Terms-of-Use-for-Onepoint-D-Wise%E2%84%A2-The-Data-Wellness-Self-Diagnostic.pdf",
"https://www.onepointltd.com/techtalk/ai-and-master-data-management-a-synergy-for-success-replay/",
"https://www.onepointltd.com/techtalk/fundamentals-of-large-language-models-replay/",
"https://www.onepointltd.com/techtalk/the-future-of-enterprise-data-access-replay/",
"https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-direct-interactions-replay/",
"https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-part-2-workflows-and-complex-interactions-replay/",
"https://www.onepointltd.com/techtalk/unlocking-the-power-of-real-time-data-replay/",
"https://www.onepointltd.com/techtalk/spotlight-on-dark-data-with-ai/",
"https://www.onepointltd.com/techtalk/spotlight-on-dark-data-with-ai-replay/"
]

def main():
    start_time = time.time()
    print_header()
    
    # Create output directory
    output_dir = "scraped_data"
    os.makedirs(output_dir, exist_ok=True)
    
    # Initialize counters
    successful_scrapes = 0
    failed_scrapes = 0
    
    # Create progress bar
    pbar = tqdm(urls_to_scrape, desc="Scraping pages", unit="page")
    
    # Scrape and save data
    for url in pbar:
        pbar.set_description(f"Processing: {url.split('/')[-1]}")
        
        # Try requests first
        content = scrape_page_requests(url)
        
        # Fallback to Selenium if requests fails
        if not content:
            pbar.write(f"🔄 Trying Selenium for {url}")
            content = scrape_page_selenium(url)
        
        if content:
            filename = generate_filename(url)
            filepath = os.path.join(output_dir, filename)
            save_to_markdown(content, filepath)
            successful_scrapes += 1
            pbar.write(f"✅ Saved: {filename}")
        else:
            failed_scrapes += 1
            pbar.write(f"❌ Failed: {url}")
    
    # Print summary
    print("\n" + "="*80)
    print("Scraping Summary:")
    print(f"Total URLs processed: {len(urls_to_scrape)}")
    print(f"Successfully scraped: {successful_scrapes}")
    print(f"Failed to scrape: {failed_scrapes}")
    print("="*80)
    
    print_footer(start_time)

if __name__ == "__main__":
    main()