# Hapsen - Healthcare AI Platform

A modern, static marketing website for Hapsen, a network-isolated AI platform for healthcare workflow management.

## Features

- **Clean, Modern Design**: Professional healthtech aesthetic with blue/teal color scheme
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Bilingual Support**: Automatic language detection and switching between English and Korean
- **No Build Required**: Pure HTML/CSS/JavaScript - no compilation or build tools needed
- **Fast & Lightweight**: Static site with smooth animations and transitions

## Project Structure

```
hapsen-homepage/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive features and i18n logic
├── translations.js     # English and Korean translations
└── README.md          # This file
```

## Local Development

Simply serve the directory with any web server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## GitHub Pages Deployment

This site is ready to deploy to GitHub Pages with zero configuration:

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select the branch (usually `main` or `master`)
4. Select root directory `/` as the source folder
5. Click Save

Your site will be live at `https://[username].github.io/[repository-name]/`

**No additional configuration needed!** The site works as-is with GitHub Pages.

## Internationalization

The site supports 7 languages with automatic browser language detection:
- **English** (`en`) - Default
- **Korean** (`ko`)
- **Japanese** (`ja`)
- **Chinese Simplified** (`zh`)
- **Spanish** (`es`)
- **Arabic** (`ar`) - RTL layout supported
- **Portuguese** (`pt`)

The site automatically detects the user's browser language and displays the appropriate translation. Users can manually cycle through all languages using the button in the top-right navigation bar. Language preference is saved in `localStorage`.

### Adding More Languages

To add a new language:

1. Add translation object to `translations.js`:
```javascript
const translations = {
    en: { /* existing */ },
    ko: { /* existing */ },
    es: { /* new language */ }
};
```

2. Update language detection in `script.js`:
```javascript
if (browserLang.startsWith('ko')) {
    return 'ko';
} else if (browserLang.startsWith('es')) {
    return 'es';
}
```

## Contact Form

The contact form is integrated with Formspree and is fully functional. Form submissions are sent to the configured email address.

## Analytics (Future Consideration)

For privacy-aligned analytics, consider implementing **Plausible Analytics** (https://plausible.io):

**Why Plausible:**
- **Brand alignment**: Demonstrates "privacy by design" philosophy that matches Hapsen's core values
- **No cookie consent needed**: GDPR/CCPA compliant without annoying cookie banners
- **Lightweight**: <1KB script vs 45KB for Google Analytics
- **Simple metrics**: Pageviews, referrers, devices, conversions - everything needed without complexity
- **Healthcare-appropriate**: No personal data collection or visitor tracking

**Implementation:**
```html
<!-- Add to <head> section of index.html -->
<script defer data-domain="hapsen.tech" src="https://plausible.io/js/script.js"></script>
```

**Cost:** $9/month for up to 10k monthly pageviews

**Alternative options considered:**
- Google Analytics: Comprehensive but requires cookie consent and conflicts with privacy messaging
- Fathom Analytics: Similar to Plausible but $14/month
- Simple Analytics: €19/month with AI insights

For a healthcare AI company where data privacy is the core value proposition, privacy-first analytics tools like Plausible are the natural choice.

## Images

All images are from Unsplash and used under the Unsplash License (free to use):
- Hero section: National Cancer Institute
- Security section: Domenico Loia
- About section: National Cancer Institute

Image sources are documented in HTML comments.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- Vanilla JavaScript (ES6+)
- No frameworks or dependencies

## License

© 2025 Hapsen. All rights reserved.
