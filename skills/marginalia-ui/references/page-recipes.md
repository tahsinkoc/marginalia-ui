# Page Recipes

Use this file when the user asks for a full page, section, app shell, or website flow and wants it built with Marginalia.

## Global Rules

- Reach for Marginalia components first.
- Use custom layout wrappers only for spacing, grid, and page structure.
- Do not switch visual language mid-page.
- Keep typography calm and surfaces warm.

## Landing or Marketing Page

Use:

- `Badge` for meta labels
- `Button` for primary and secondary actions
- `Card` for proof points, features, and testimonials
- `Accordion` for FAQs
- `RichTextSurface` for manifesto or editorial sections

Suggested structure:

1. Hero with `Badge`, heading, paragraph, action buttons
2. Feature grid of `Card`
3. Secondary editorial section with `RichTextSurface`
4. FAQ with `Accordion`

Avoid:

- Loud KPI tiles
- Harsh gradients
- Overdesigned icon bubbles

## Product Dashboard or Admin Page

Use:

- `Card` for grouped metrics and filters
- `DataTable` for sortable data
- `Badge` for statuses
- `Alert` for operational notices
- `Pagination` for long datasets
- `EmptyState` when data is absent
- `Sheet` for row detail or side editing

Suggested structure:

1. Page header with breadcrumb and actions
2. Filter or controls card
3. Main `DataTable`
4. Optional side `Sheet` for row details

## Docs or Knowledge Base Page

Use:

- `Sheet` for mobile navigation
- `Breadcrumb` for path context
- `Card` for side menus or callouts
- `CodeViewer` for code snippets
- `RichTextSurface` for prose blocks
- `Tabs` if code/output or multiple examples sit side by side

Suggested structure:

1. Sticky or fixed top nav
2. Left docs index on desktop, `Sheet` on mobile
3. `RichTextSurface` for narrative
4. `CodeViewer` and live previews for examples

## Editorial or Blog Article

Use:

- `RichTextSurface` as the main reading wrapper
- `Badge` or `RichTextKicker` for issue/category
- `Avatar` and `HoverCard` for author details
- `Alert` for notes or warnings
- `CodeViewer` for technical inserts

Suggested structure:

1. Kicker or badge
2. Title and lead
3. Author row with `Avatar`
4. Main article body inside `RichTextSurface`

## Settings or Form Page

Use:

- `Card` to group each section
- `Label`, `Input`, `Textarea`, `Select`, `Combobox`
- `RadioGroup`, `Switch`, `Checkbox` for preferences
- `DatePicker` for schedule or deadline fields
- `Button` for section actions

Suggested structure:

1. Header with title and description
2. A vertical stack of cards
3. Each card contains one coherent group of fields
4. Footer actions stay compact and clear

## App Navigation Shell

Use:

- `Menubar` for desktop productivity actions
- `Breadcrumb` for page context
- `Sheet` for mobile nav or utility drawer
- `Tabs` for subviews within a page

Do not:

- Recreate a full custom nav system if Marginalia primitives already cover it
- Add unrelated third-party menu libraries

## Composition Strategy When a Pattern Is Missing

Use this order:

1. Compose from `Card`, `Button`, `Badge`, `Input`, `Tabs`, `Sheet`, `Dialog`, `Popover`
2. Add thin custom layout wrappers
3. Add a new reusable component only if the pattern clearly repeats and the kit truly lacks it

## Good Marginalia Outcomes

- Feels authored, not generic
- Uses warmth without becoming decorative
- Reads clearly on both desktop and mobile
- Keeps interaction surfaces calm and readable
- Looks like one coherent system
