# Image drop-in guide

The site references the filenames below. Until a real file exists, the page
renders a tasteful bronze placeholder labeled with the piece name — so nothing
ever looks broken. **Drop your real photos in here using these exact names and
they appear automatically. No HTML changes needed.**

| Filename                       | Which photo (from what you sent)                                  | Used on                        |
| ------------------------------ | ----------------------------------------------------------------- | ------------------------------ |
| `logo.png`                     | The Wells Gallery logo — pintail in the oval (kept as-is)          | Header + footer, both pages    |
| `ronnie-wells-portrait.jpg`    | Portrait of Ronnie Wells (glasses, green shirt)                    | About section, gallery         |
| `natureworks-ducks.jpg`        | Two pintails on the stone cairn — "NatureWorks…Conservation"       | Hero image + works grid        |
| `heart-of-a-champion.jpg`      | The Gene Campbell monument — "Heart of a Champion," 1931–2004      | Works grid, gallery            |
| `gus-mccrae-bench.jpg`         | Seated cowboy on the bench — "Uva Uvam Vivendo Varia Fit"          | Works grid (featured), gallery |
| `lion.jpg`                     | The seated bronze lion at the stone entrance                      | Works grid, gallery            |
| `flying-geese-monument.jpg`    | Waterfowl in flight outside the rotunda building                  | Works grid, gallery            |
| `favicon.png`                  | (Optional) small square crop of the logo for the browser tab      | Browser tab                    |

## Tips
- Keep the logo as a **PNG with a transparent background** so it sits cleanly on
  the cream header. If yours has a white box around it, that's fine too.
- Landscape shots look best around **1600 px wide**; portraits around
  **1200 px wide**. Large enough to look crisp, small enough to load fast.
- Want to rename a piece or change a caption? Open `index.html` /
  `gallery.html` and edit the `data-title` / `data-meta` / `<h3>` text — they're
  grouped right next to each image.
