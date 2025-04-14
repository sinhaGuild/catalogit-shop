 <div style="padding:18px">
  <p align="center">
      <img src="https://i.imgur.com/5sGXVWv.png" height="250">
      <h1 align="center" style="letter-spacing:24px;font-size:32px;">PIKASO</h1>
      <h1 align="center" style="letter-spacing:18px;font-size:18px;">CATALOGIT-SHOP</h1>
  </p>
    <a href="https://github.com/sinhaGuild">
      <p align="center" style="font-weight:normal;text-underline-offset:8px;font-style:italic;">by sinhaguild</p>
    </a>
      <hr style="border-top:8px solid #bbb;border-radius:5px;" />
  </div>

# CatalogIt Shop

CatalogIt Shop is a modern web application for showcasing a catalog of collectible or unique items. Built with Next.js, it provides a clean browsing experience, detailed item views, and direct WhatsApp contact for inquiries.

## Features

- **Catalog Home**: Browse all items in a visually appealing grid.
- **Item Detail Page**: View detailed information, tags, and images for each item.
- **Image Zoom**: Click any item image to open a full-resolution dialog for close inspection.
- **Navigation Bar**: Quickly access "All Items" or contact via WhatsApp from anywhere in the app.
- **Contact via WhatsApp**: 
  - On item detail: Prefilled message includes the item name and link.
  - On navigation: Prefilled message for general questions (no item link).
- **Responsive Design**: Works great on desktop and mobile.
- **Dark Mode**: Seamless support for light and dark themes.

## Technologies Used

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [@notionhq/client](https://github.com/makenotion/notion-sdk-js) (for item data)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
- [Radix UI](https://www.radix-ui.com/) (accessible UI primitives)
- [Vercel](https://vercel.com/) (recommended deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Environment Variables

Create a `.env.local` file in the root with the following:

```
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Folder Structure

```
src/
  app/                # Next.js app directory
    layout.tsx        # Main layout (add NavBar here)
    page.tsx          # Home page (all items)
    item/[id]/        # Dynamic item detail pages
      page.tsx
  components/
    NavBar.tsx        # Navigation bar (All Items, Contact us)
    ItemImageGallery.tsx # Image carousel with zoom dialog
    ui/               # UI primitives (badge, button, card, etc.)
  lib/
    notion.ts         # Notion API integration
    utils.ts          # Utility functions
  types/
    product.ts        # Product type definitions
public/               # Static assets (SVGs, favicon, etc.)
```

## Customization

- **Add/Remove Items**: Update your Notion database; the app fetches items dynamically.
- **Styling**: Modify Tailwind classes or extend the UI components in `src/components/ui/`.

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

## License

MIT

---

Built with ❤️ using Next.js and Notion.
