# Academic Nexus (BeaFind)

Platform informasi beasiswa, magang, dan lomba untuk siswa dan mahasiswa Indonesia — dibangun dengan Next.js App Router.

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- next-themes (dark/light mode)
- next/image

## Halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Beranda dengan hero, stats, carousel, kategori, peluang unggulan |
| `/beasiswa` | Daftar beasiswa dengan pencarian |
| `/magang` | Daftar program magang |
| `/lomba` | Daftar kompetisi/lomba |
| `/lomba/[slug]` | Detail lomba (SSG + ISR) |
| `/helpcentre` | Pusat bantuan & FAQ |

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Build Production

```bash
npm run build
npm start
```

## Deploy ke Vercel

1. Push repo ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Deploy — tidak perlu konfigurasi tambahan

## Struktur Folder

```
src/
├── app/              # App Router pages
├── components/       # UI & layout components
├── data/             # Static content (opportunities, FAQ)
├── lib/              # Utilities
└── types/            # TypeScript types
```

## Menambah Data

Edit `src/data/opportunities.ts` untuk menambah beasiswa, magang, atau lomba baru.
