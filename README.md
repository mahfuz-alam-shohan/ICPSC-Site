# IPSC Frontend

This repository provides only the static frontend pages for Ispahani Public School & College. All server code, databases, and dependencies have been removed.

## Structure
```
.
├── assets/         # Images and other static assets
├── components/     # Shared CSS/JS used across pages
├── pages/          # Additional HTML pages
├── index.html      # Landing page
└── .nojekyll       # Disable Jekyll for static hosting
```

Pages use plain HTML, Tailwind via CDN, and vanilla JavaScript. Images are loaded from the `assets` directory.
