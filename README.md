# 🏷️ Gerador de Etiquetas — Barcode Label App

A modern barcode & QR code label generator built with **React**, **Vite**, and **TypeScript**. Generate print-ready A4 labels with barcodes in seconds.

## ✨ Features

- 📦 Generate barcode labels formatted for A4 printing
- 🌙 Dark / Light mode toggle
- 🖨️ Print-ready output (hides UI chrome when printing)
- ⚡ Fast, client-side only — no backend required
- 📱 Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/seltondesouza/barcode-label-app.git
cd barcode-label-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production bundle will be output to the `dist/` folder.

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI framework |
| [Vite 5](https://vitejs.dev) | Build tool & dev server |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [JsBarcode](https://github.com/lindell/JsBarcode) | Barcode rendering |
| [qrcode.react](https://github.com/zpao/qrcode.react) | QR code rendering |

## 📁 Project Structure

```
barcode-label-app/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json          # Vercel SPA routing config
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    ├── jsbarcode.d.ts
    └── components/
        ├── InputForm.tsx
        └── LabelPreview.tsx
```

## 🌐 Deploy

This project is configured for **zero-config deployment on [Vercel](https://vercel.com)**:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seltondesouza/barcode-label-app)

## 📄 License

MIT © Selton de Souza
