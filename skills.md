# Skills

This document details the specific skills and tools available to the AI assistant for the AC Games project.

## Available Tools

The AI has access to advanced IDE integration tools:

### File System & Editing
- `read_file`: Read content.
- `write_file`: Overwrite full files.
- `replace_file_content`: Surgical edit for a single block.
- `multi_replace_file_content`: Perform multiple non-contiguous edits in one go (Preferred for efficiency).
- `list_files` & `find_files`: Locate files across the project.

### Search & Navigation
- `grep`: Search for text patterns or regex across the codebase.
- `code_search`: Semantic search in the project index.
- `find_declaration` & `find_usages`: Resolve symbols and references.

### Analysis & Web
- `analyze_file`: Check for syntax errors and warnings.
- `web_search`: Access up-to-date information or documentation.
- `read_url`: Extract information from specific web pages.

## Project-Specific Capabilities

- **Internationalization (i18n)**: Manage 7 languages (EN, FR, NL, ES, ID, AR, HI) including Right-to-Left (RTL) support for Arabic.
- **Mobile optimization**: Implementing touch-friendly UI (44px targets), responsive layouts, and lazy-loading.
- **SEO & Growth**: Implementation of Sitemaps, robots.txt, JSON-LD structured data, and International SEO (hreflang).
- **PWA (Progressive Web App)**: Mobile installation support via `manifest.json`.
- **External Integrations**: Expert in EmailJS templates, Google reCAPTCHA, and Google Analytics 4.
- **Social Sharing**: Implementation of Web Share API and Open Graph meta tags.

## Project Structure Knowledge
- Roots: `/`, `/flappy-vertical/`, `/block-drift/`, `/slice-and-trap/`.
- Logic: Centralized i18n in `src/i18n.js` and form handling in `src/form.js`.
- Deployment: Currently v1.0.2.
