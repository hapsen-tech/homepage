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

The site automatically detects the user's browser language:
- Korean browsers (`ko-*`) → Korean by default
- All others → English by default

Users can manually toggle languages using the button in the top-right navigation bar. Language preference is saved in `localStorage`.

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

The contact form currently displays a success animation but doesn't submit data anywhere. To make it functional:

**Option 1: Formspree (Recommended for static sites)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Netlify Forms**
```html
<form data-netlify="true">
```

**Option 3: EmailJS**
Use their JavaScript SDK to send emails directly from the client.

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
