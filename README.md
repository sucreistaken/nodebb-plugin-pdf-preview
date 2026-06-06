# nodebb-plugin-pdf-preview

NodeBB plugin that renders **uploaded PDFs inline as a viewer** instead of a download link.

When a user attaches a PDF to a topic or reply, the standard NodeBB behavior is to show it as a download icon. This plugin upgrades that to an embedded PDF viewer — readers stay in the topic, can scroll the document, zoom, and search inside it, all without leaving the page.

Successor to the older `nodebb-plugin-pdf-secure` work; rebuilt cleanly with current NodeBB hooks.

## What it does

- Detects `.pdf` attachments in posts
- Replaces the download link with an inline viewer (PDF.js)
- Supports multi-page scroll, zoom, jump-to-page, in-document search
- Mobile-responsive viewer
- Configurable max preview size (full vs. first N pages)
- Falls back to download link if the file fails to load

## Install

```bash
cd /path/to/nodebb
npm install nodebb-plugin-pdf-preview
./nodebb activate nodebb-plugin-pdf-preview
./nodebb build
./nodebb restart
```

## Config

ACP → Plugins → PDF Preview: set viewer height, default zoom, and whether to lazy-load.

## Relationship to `nodebb-plugin-pdf-secure`

`pdf-secure` was an earlier attempt with watermarking + access control built in. This repo (`pdf-preview`) is the lighter, more focused successor — just inline rendering, no watermarking. Use `pdf-secure` if you need access-controlled docs; use this one for general-purpose inline reading.
