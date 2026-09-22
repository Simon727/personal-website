# Personal Website

Source files for Xuancheng Jin's personal website.

## Routes

- `/` — personal website homepage.
- `/resume/` — academic curriculum vitae.

The resume is intentionally isolated inside the `resume/` directory. Its styles, scripts, images, and downloadable files use relative paths so it can be served correctly from `/resume/`.

## Local preview

From the repository root, run:

```powershell
C:\Users\Administrator\anaconda3\envs\YW\python.exe -m http.server 8081
```

Then open:

- `http://127.0.0.1:8081/`
- `http://127.0.0.1:8081/resume/`

## Cloudflare Pages

This repository can be connected directly to Cloudflare Pages as a static HTML project.

- Framework preset: None
- Build command: leave empty
- Build output directory: `/`

GitHub Pages should remain disabled.
