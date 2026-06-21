export const siteConfig = {
  name: "BeaFind",
  title: "Academic Nexus - Temukan Peluang Masa Depanmu",
  description:
    "Satu platform untuk menemukan peluang akademik, pengembangan diri, dan karier bagi mahasiswa Indonesia.",
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC12smeVL4nyt8Sye-icAoul4KYPdK5ewN9HL4SFOL0yP5vS75sOE5Oe3C5791KD2VBDJjScp-JeKDC13kExtjKsabP5GN6qtFB-Umx6_p8bjPram5syx5WIWJ7ZVXJzkVEu5yVOXqPG3L6NbtbwpabICLI0oAtQNQ5IPXj8VUuZS1XzRuXxM4ya-NBEuK1ye3iRWBOo--IqI9GrNTJ3xbSBT8LmtU3XMIGjckFtOBXww_RBSXbmZmtAJK80RO6e4ApYnORO_SuzSs",
};

export const stats = [
  { value: 500, label: "Beasiswa", suffix: "+" },
  { value: 300, label: "Magang", suffix: "+" },
  { value: 200, label: "Lomba", suffix: "+" },
  { value: 50000, label: "Pengguna", suffix: "+" },
];

export const carouselSlides = [
  {
    id: "1",
    badge: "Eksklusif",
    badgeClass: "bg-primary text-on-primary",
    title: "Peluang Beasiswa Unggulan 2024",
    description: "Daftar sekarang dan dapatkan kesempatan berkuliah di universitas impianmu dengan dukungan penuh.",
    buttonText: "Cek Selengkapnya",
    buttonClass: "bg-primary text-on-primary hover:scale-105",
    bgClass: "bg-primary-container/10",
    icon: "campaign",
    iconClass: "text-primary/40 border-primary/40 bg-primary/20",
    href: "/beasiswa",
  },
  {
    id: "2",
    badge: "Karier",
    badgeClass: "bg-secondary text-on-secondary",
    title: "Program Magang BUMN Batch II",
    description: "Dapatkan pengalaman kerja profesional di instansi pemerintahan dan perusahaan plat merah terbaik.",
    buttonText: "Daftar Magang",
    buttonClass: "bg-secondary text-on-secondary hover:scale-105",
    bgClass: "bg-secondary-container/10",
    icon: "work",
    iconClass: "text-secondary/40 border-secondary/40 bg-secondary/20",
    href: "/magang",
  },
  {
    id: "3",
    badge: "Prestasi",
    badgeClass: "bg-tertiary text-on-tertiary",
    title: "National Case Competition",
    description: "Tunjukkan kemampuan analisismu dan menangkan total hadiah puluhan juta rupiah.",
    buttonText: "Ikuti Lomba",
    buttonClass: "bg-tertiary text-on-tertiary hover:scale-105",
    bgClass: "bg-tertiary-container/10",
    icon: "emoji_events",
    iconClass: "text-tertiary/40 border-tertiary/40 bg-tertiary/20",
    href: "/lomba",
  },
];

export const helpArticles = [
  {
    id: "h1",
    category: "Akun & Profil",
    question: "Bagaimana cara membuat akun di BeaFind?",
    answer: "Klik tombol 'Register' di pojok kanan atas, lalu isi nama, email, dan password Anda. Setelah itu, Anda bisa langsung melengkapi profil dan mulai mencari beasiswa.",
  },
  {
    id: "h2",
    category: "Pendaftaran",
    question: "Apakah saya perlu membayar untuk mendaftar beasiswa?",
    answer: "Tidak. Seluruh informasi beasiswa, magang, dan lomba di platform kami gratis untuk diakses.",
  },
  {
    id: "h3",
    category: "Pendaftaran",
    question: "Bagaimana cara mengetahui status pengajuan saya?",
    answer: "Saat ini Anda dapat melihat status pengajuan di dashboard pengguna. Pengajuan akan ditinjau oleh tim admin dalam waktu 1x24 jam.",
  },
];
