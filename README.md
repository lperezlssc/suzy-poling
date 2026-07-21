# Suzy Poling Portfolio

A beautiful portfolio website featuring 154 exhibition photos with a draggable gallery interface.

## 🎨 Features

- **Dark-themed design** with smooth animations
- **Draggable project gallery** inspired by GSAP examples
- **Individual project detail pages** with metadata
- **154 exhibition photos** uploaded to Sanity CMS
- **Fully responsive** design
- **Content management** via Sanity Studio

## 🛠 Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS
- **CMS**: Sanity
- **Images**: Sanity Image URL builder
- **Deployment**: Vercel

## 📁 Project Structure

```
suzy-poling/
├── studio/                  # Sanity Studio
│   ├── schemaTypes/        # Content schema
│   └── sanity.config.ts
├── web/                    # Next.js app
│   ├── src/
│   │   ├── app/           # Pages & layouts
│   │   ├── components/    # React components
│   │   └── sanity/        # Sanity client config
│   └── .env.local         # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/lperezlssc/suzy-poling.git
cd suzy-poling/web
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

## 📝 Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=80s6mar7
NEXT_PUBLIC_SANITY_DATASET=production
```

## 🎯 Features in Detail

### Draggable Gallery
- Click and drag to browse projects
- Smooth scroll animations
- Responsive on all devices

### Project Details
- Individual pages for each project
- Full-width featured images
- Project metadata (skills, dates)
- Portable Text content

### Content Management
- Manage all projects from Sanity Studio
- Upload and edit project information
- Organize by date

## 📖 Usage

### Edit Content
1. Open Sanity Studio at `/studio`
2. Navigate to "Portfolio Projects"
3. Create, edit, or delete projects
4. Changes appear instantly on the website

### Customize
- Update hero text in `src/app/page.tsx`
- Modify colors in Tailwind classes
- Change fonts in `src/app/layout.tsx`

## 🚀 Deployment

Deployed on Vercel at: [suzy-poling.vercel.app](https://suzy-poling.vercel.app)

## 📄 License

All rights reserved.
