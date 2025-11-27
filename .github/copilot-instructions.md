# Copilot Instructions for GaryWebsite

## Project Overview
This is a **MkDocs-based static site** documenting "Historical Hong Kong: Maritime Lens" with an interactive map interface. It combines historical map layers with modern mapping using Leaflet.js, featuring calibration tools for coordinate transformation between historical and modern map systems.

**Key Tech Stack:**
- **MkDocs** with Material theme for documentation structure and navigation
- **Leaflet.js** (v1.9.4) for interactive mapping
- **JavaScript/CSS** for custom UI and map interactions
- **PWA Support** (manifest.json) for offline capability

## Architecture & Components

### File Structure Patterns
- **`docs/`**: All content and assets
  - `index.md`: Main landing page with full map implementation
  - `css/custom.css`: Theme customization and map UI styling (581 lines)
  - `js/custom.js`: Core map functionality and calibration logic (185 lines)
  - `js/fix-title.js`: Browser title persistence workaround
  - `blog/`, `about/`, `coding/`: Content sections
- **`mkdocs.yml`**: Site configuration with Material theme, Leaflet CDN links, and navigation structure

### Key Integrations
1. **Material Theme**: Configured with dark/light mode toggle, sticky navigation tabs, search, and auto-hide header
2. **Leaflet Maps**: Historical and modern map layers with opacity controls
3. **Custom Calibration System**: Allows users to reference-click pairs between historical and modern maps to compute coordinate transformations

## Developer Workflows

### Local Development
```bash
# Install dependencies (MkDocs + plugins)
pip install -r requirements.txt  # if exists, or use: pip install mkdocs mkdocs-material mkdocs-blog

# Run dev server (hot-reload)
mkdocs serve

# Navigate to http://localhost:8000 to see site live
```

### Building for Deployment
```bash
mkdocs build  # Generates static site in ./site/
```

### Content Updates
- **Markdown pages**: Edit in `docs/` subdirectories; structure reflects in sidebar via `mkdocs.yml` nav config
- **Navigation**: Update `mkdocs.yml` nav section to add/reorder pages
- **Map data/imagery**: Modify Leaflet layer URLs in `index.md` (look for `L.tileLayer()` calls)

## Code Patterns & Conventions

### Map Initialization (in `index.md`)
- Map container: `<div id="mapwarper-style-map">` (full-height viewport)
- Leaflet initialized with custom zoom controls and layer management
- Historical layer loaded by default; modern layer togglable

### Conditional UI (in `custom.js`)
- **Sidebar visibility logic**: `showSidebarPages` array controls which routes show navigation sidebar
  - `/about/` and `/testing/` routes display sidebar; map page hides it
  - Uses `window.location.pathname` matching
- **Calibration mode**: User can enable reference-point calibration to compute affine transformations between map systems

### Styling Conventions (in `custom.css`)
- Glassmorphism effects: `backdrop-filter: blur(10px)` on header/tabs for depth
- Color scheme: `#2c3e50` (text), `#f8f9fa` (backgrounds), `#dee2e6` (borders)
- **Dark mode support**: Separate rules under `[data-md-color-scheme="slate"]` block
- **Responsive**: Flexbox-based toolbar and layer control panels

### Chinese/Traditional Characters
- Content and comments use Traditional Chinese (香港歷史、地圖校準)
- No special encoding issues expected; UTF-8 assumed throughout

## Critical Implementation Details

### Leaflet Customization
- **Custom markers**: Divicon with colored circles for calibration points (red=historical, green=modern)
- **Layer control**: Custom HTML panel (not Leaflet's default) with checkboxes and opacity slider
- **Zoom controls**: Buttons in toolbar call `zoomIn()`, `zoomOut()`, `resetView()` functions

### PWA Configuration
- `manifest.json` defines app metadata (standalone mode, theme color, icons)
- Inline script in `index.md` forcibly resets manifest link on load (ensures proper detection)

### CSS Customization Strategy
- Uses `!important` flags extensively to override Material theme defaults
- Separate blocks for light vs. dark mode styling
- Sidebar toggle via `show-sidebar` class on document root

## Common Editing Scenarios

1. **Adding new content page**: Create `.md` file in appropriate folder, add entry to `mkdocs.yml` nav
2. **Adjusting map bounds/zoom**: Edit initial `setView([lat, lng], zoom)` in `index.md` script section
3. **Adding map layer**: Insert new `L.tileLayer()` or `L.imageOverlay()` and add checkbox to layer control
4. **Tweaking theme colors**: Update hex values in `custom.css` (note: Material theme vars often overridden)
5. **Debugging sidebar visibility**: Check `showSidebarPages` array logic in `custom.js` and route matching

## Dependencies & Versions
- **mkdocs-material**: Latest (check theme features in config)
- **mkdocs-blog**: Plugin enabled; note blog posts currently commented in nav
- **Leaflet.js**: 1.9.4 (CDN)
- **Python**: 3.x for MkDocs CLI

## Notes for AI Agents
- The codebase mixes MkDocs templating with raw HTML/JS/CSS inline in `index.md`—treat carefully when editing
- Calibration reference-points system is experimental; coordinate transformation logic in `calculateTransformation()` may need testing
- Material theme Material theme heavily styles the page; always check CSS specificity when modifying styles
- Chinese comments throughout are functional documentation; preserve them
