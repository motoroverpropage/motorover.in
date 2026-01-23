# MotoRover Static Site

A complete static HTML/CSS/JavaScript rebuild of motorover.in, designed to achieve Lighthouse 100s across all categories.

## Project Structure

```
motorover.in/
├── index.html                 # Homepage
├── robots.txt                 # Robots directives
├── sitemap.xml                # XML sitemap
├── manifest.webmanifest       # PWA manifest
├── assets/
│   ├── img/                   # Optimized images
│   └── icons/                 # SVG/icons
├── css/
│   └── styles.css             # Main stylesheet
├── js/
│   ├── main.js               # Main JavaScript
│   ├── theme.js               # Theme toggle
│   └── i18n.js                # Internationalization
├── content/
│   ├── content.json           # Scraped page content
│   ├── entities.json          # Normalized entities
│   ├── assets.json            # Asset references
│   └── sitemap.json           # URL structure
├── scripts/
│   ├── scraper.py             # Web scraper
│   ├── download_images.py     # Image downloader/optimizer
│   ├── generate_site.py       # Static site generator
│   └── extract_critical_css.py # Critical CSS extractor
├── templates/                 # Jinja2 templates
├── tours/                     # Tour pages
├── about/                     # About pages
├── i18n/                      # Translation files
└── README.md                  # This file
```

## Prerequisites

- Python 3.8+
- pip

## Installation

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

## Usage

### 1. Scrape Content

Scrape all content from motorover.in:

```bash
python scripts/scraper.py
```

This will create:
- `content/content.json` - All page content
- `content/entities.json` - Normalized entities (tours, FAQs, testimonials, etc.)
- `content/assets.json` - Asset references
- `content/sitemap.json` - URL structure

### 2. Download and Optimize Images

Download all images and create optimized versions:

```bash
python scripts/download_images.py
```

This will:
- Download all images to `assets/img/`
- Create WebP and AVIF versions
- Generate responsive srcset data
- Update `content/assets.json` with optimization metadata

### 3. Generate Static Site

Generate HTML pages from JSON content:

```bash
python scripts/generate_site.py
```

This will:
- Generate all HTML pages from templates
- Create `sitemap.xml`
- Create `robots.txt`

### 4. Extract Critical CSS (Optional)

Extract above-the-fold CSS for inlining:

```bash
python scripts/extract_critical_css.py
```

## Local Development

### Serve Locally

Using Python's built-in server:

```bash
# Python 3
python -m http.server 8000

# Or using Node.js (if installed)
npx serve .
```

Then visit `http://localhost:8000`

### Using a Different Server

Any static file server will work:
- `npx serve`
- `python -m http.server`
- `php -S localhost:8000`
- VS Code Live Server extension

## Lighthouse Testing

### Running Lighthouse

1. **Chrome DevTools** (Recommended):
   - Open the site in Chrome
   - Press F12 to open DevTools
   - Go to "Lighthouse" tab
   - Select categories (Performance, Accessibility, Best Practices, SEO)
   - Click "Analyze page load"
   - Wait for results

2. **CLI** (if installed):
   ```bash
   npx lighthouse http://localhost:8000 --view
   ```

3. **PageSpeed Insights**:
   - Deploy site to a public URL
   - Test at https://pagespeed.web.dev/

### Target Scores

- **Performance**: 100
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Performance Optimization Checklist

- [x] System font stack (no external fonts)
- [x] Lazy loading images (`loading="lazy"`)
- [x] Explicit image dimensions (prevent CLS)
- [x] Minimal JavaScript (progressive enhancement)
- [x] Optimized images (WebP/AVIF with fallbacks)
- [x] Semantic HTML5
- [x] CSS variables for theming
- [x] Respect `prefers-reduced-motion`
- [x] No third-party trackers
- [x] Proper caching headers (configure on server)

### Image Optimization

Images are optimized using:
- **Pillow** for format conversion
- **WebP** format (85% quality)
- **AVIF** format (80% quality, if supported)
- **Responsive srcsets** for different screen sizes

All images include:
- Explicit `width` and `height` attributes
- `loading="lazy"` for below-fold images
- `decoding="async"` attribute
- Responsive `srcset` and `sizes` attributes

## Accessibility

The site follows WCAG 2.1 AA guidelines:

- Semantic HTML5 landmarks
- Skip-to-content link
- Keyboard navigation support
- Proper ARIA attributes
- Focus states (2px+ outline)
- Color contrast (AA/AAA compliant)
- Alt text for all images
- Form labels (no placeholder-only)
- Respects `prefers-reduced-motion`

## SEO

- Unique `<title>` and meta descriptions
- Canonical URLs
- OpenGraph and Twitter Card tags
- JSON-LD structured data:
  - Organization
  - WebSite
  - BreadcrumbList
  - FAQPage
  - TouristTrip
  - Person (team pages)
- Clean heading hierarchy (one H1 per page)
- `sitemap.xml` and `robots.txt`

## Internationalization (i18n)

Default locale: `en-IN`

Translation files:
- `i18n/en-IN.json` (default)
- `i18n/en-US.json` (stub)

To add translations:
1. Add keys to translation files
2. Use `data-i18n="key"` attribute in HTML
3. JavaScript will automatically swap text

## Theme Toggle

The site supports light/dark themes:
- Defaults to system preference
- Toggle button in header
- Preference stored in `localStorage`
- CSS variables for easy theming

## Browser Support

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Graceful degradation for older browsers

## Deployment

### Static Hosting

The site can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: `vercel deploy`
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3 + CloudFront**: Upload files to S3 bucket
- **Cloudflare Pages**: Connect Git repository

### Cache Headers

For optimal performance, configure these cache headers on your server:

```
# HTML files
Cache-Control: public, max-age=3600, must-revalidate

# CSS/JS files
Cache-Control: public, max-age=31536000, immutable

# Images
Cache-Control: public, max-age=31536000, immutable

# Fonts (if any)
Cache-Control: public, max-age=31536000, immutable
```

### Redirects

If URLs change, update `content/sitemap.json` with redirect mappings, then regenerate `sitemap.xml` and `robots.txt`.

## Development Notes

### Design System

The CSS follows a minimal, premium aesthetic inspired by LoveFrom/Jony Ive:
- Generous whitespace
- Clear typographic hierarchy
- Subtle motion (respects reduced motion)
- System font stack
- CSS variables for theming

### Component Naming

Uses BEM-like naming:
- `.card` - Block
- `.card__title` - Element
- `.card--featured` - Modifier

### JavaScript

All JavaScript is:
- Vanilla (no frameworks)
- Progressive enhancement
- Minimal and efficient
- Deferred loading

## Troubleshooting

### Python Not Found

If Python is not in PATH:
- Install Python from python.org
- Or use `py` launcher on Windows
- Or use `python3` on Linux/Mac

### Images Not Loading

1. Run `scripts/download_images.py` first
2. Check `assets/img/` directory exists
3. Verify image paths in generated HTML

### Templates Not Rendering

1. Ensure Jinja2 is installed: `pip install Jinja2`
2. Check template syntax
3. Verify JSON content structure matches template expectations

## License

This project is for the MotoRover website rebuild.

## Credits

- Design inspiration: LoveFrom / Jony Ive aesthetic
- Built with: HTML5, CSS3, Vanilla JavaScript, Python
- Tools: BeautifulSoup4, Jinja2, Pillow
