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

## Images

Place a `cover.png` in the post folder. Run `node build/convert-to-webp.js` to generate the `.webp` and thumbnail versions. Then run `node build/build-blog.js` to rebuild the blog data.
