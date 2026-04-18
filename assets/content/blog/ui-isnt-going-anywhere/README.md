# Blog Post Template

Copy this folder to create a new blog post. Rename the folder to match your post slug.

## Post JSON Fields

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Unique ID (e.g., `blog-003`) |
| `title` | Yes | Post title |
| `slug` | Yes | URL slug — must match the folder name |
| `datePublished` | Yes | Publish date (`YYYY-MM-DD`) |
| `category` | Yes | Post category (e.g., `perspective`, `process`) |
| `excerpt` | Yes | Summary shown on the blog listing page |
| `order` | No | Sort tiebreaker for posts on the same date (higher = first) |
| `coverPosition` | No | Image positioning for the card thumbnail (defaults to `center`) |
| `relatedItem` | No | Slug of a related project or post |
| `interactiveUrl` | No | Relative path (from the post folder) to an interactive demo |
| `interactiveLabel` | No | Button text for the interactive CTA (defaults to "Try it out") |
| `content` | Yes | Post body as an HTML string |

## Cover Image Positioning

The `coverPosition` field controls how the cover image is cropped within the blog card thumbnail. It accepts any valid CSS `background-position` value.

**Common values:**

| Value | Effect |
|---|---|
| `center` | Centers the image (default) |
| `top` | Aligns to the top edge |
| `bottom` | Aligns to the bottom edge |
| `center 20%` | Near the top (20% from top edge) |
| `center 40%` | Slightly above center |
| `center 60%` | Slightly below center |
| `center 80%` | Near the bottom (80% from top edge) |

**How it works:** The percentage is the vertical position — `0%` is the top, `50%` is center, `100%` is the bottom. If omitted, the image defaults to `center`.

## HTML Template & Build Script

The HTML page template lives at `blog/_template.html`. You do **not** need to manually duplicate or edit it. The build script (`build/build-blog.js`) automatically generates each blog page from the template using the data in `post.json`.

**What the build script handles:**
- Replaces all template placeholders (`{{TITLE}}`, `{{SLUG}}`, `{{DESCRIPTION}}`, etc.)
- Inlines the `content` HTML from `post.json` into the article body
- Generates JSON-LD structured data from post metadata
- Renders the interactive CTA block if `interactiveUrl` is set in `post.json`
- Sets cache-busting version timestamps on CSS and JS includes

## Creating a New Post

1. Copy this `_template` folder and rename it to your post slug (e.g., `the-speed-of-thought`)
2. Replace `cover.png` with your cover image
3. Fill out `post.json` with your post data
4. Run `node build/convert-to-webp.js` to generate `.webp` and thumbnail versions
5. Run `node build/build-blog.js` to generate the blog data JS and all HTML pages

## Images

Place a `cover.png` in the post folder. Run `node build/convert-to-webp.js` to generate the `.webp` and thumbnail versions. Then run `node build/build-blog.js` to rebuild the blog data.
