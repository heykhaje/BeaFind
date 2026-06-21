import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const opportunities = [
  {
    slug: "djarum-beasiswa-plus-2024",
    title: "Djarum Beasiswa Plus 2024",
    organization: "Djarum Foundation",
    category: "beasiswa",
    deadline: "30 Mei 2024",
    deadlineUrgent: true,
    description: "Program beasiswa unggulan untuk mahasiswa berprestasi dengan dukungan biaya pendidikan dan pengembangan soft skill.",
    location: "Seluruh Indonesia",
    requirements: ["Mahasiswa aktif S1 semester 3-7", "IPK minimal 3.00", "Aktif dalam organisasi kemahasiswaan"],
    benefits: ["Biaya pendidikan penuh", "Pelatihan leadership", "Mentoring profesional"],
    featured: true,
  },
  {
    slug: "google-software-engineering-intern",
    title: "Software Engineering Intern",
    organization: "Google Indonesia",
    category: "magang",
    deadline: "15 Jun 2024",
    description: "Kesempatan magang di tim engineering Google Indonesia dengan exposure ke produk global dan teknologi terkini.",
    location: "Jakarta, Indonesia",
    requirements: ["Mahasiswa S1/S2 jurusan CS atau setara", "Pengalaman dengan Python, Java, atau Go", "Kemampuan problem solving yang kuat"],
    benefits: ["Gaji kompetitif", "Mentor senior engineer", "Kemungkinan full-time offer"],
    featured: true,
  },
  {
    slug: "icpc-competition-regional",
    title: "ICPC Competition Regional",
    organization: "ACM-ICPC Organization",
    category: "lomba",
    deadline: "20 Jul 2024",
    description: "Kompetisi pemrograman tingkat regional untuk tim universitas dengan standar internasional ACM-ICPC.",
    location: "Bandung, Indonesia",
    requirements: ["Tim 3 orang mahasiswa", "Coach dari dosen universitas", "Registrasi via universitas"],
    benefits: ["Sertifikat internasional", "Hadiah total Rp 100 juta", "Akses ke World Finals"],
    featured: true,
  },
  {
    slug: "beasiswa-indonesia-bangkit-2024",
    title: "Beasiswa Indonesia Bangkit 2024",
    organization: "Kementerian Agama RI",
    category: "beasiswa",
    deadline: "10 Jul 2024",
    description: "Beasiswa untuk mahasiswa berprestasi dari keluarga kurang mampu dengan fokus pada pengembangan karakter.",
    location: "Seluruh Indonesia",
    requirements: ["Mahasiswa aktif S1", "Surat keterangan tidak mampu", "Essay motivasi"],
    benefits: ["Biaya SPP", "Uang saku bulanan", "Program pengembangan diri"],
    featured: true,
  },
  {
    slug: "traveloka-ui-ux-design-intern",
    title: "UI/UX Design Intern",
    organization: "Traveloka Indonesia",
    category: "magang",
    deadline: "05 Jun 2024",
    description: "Magang desain produk digital di Traveloka dengan fokus pada user research dan design system.",
    location: "Jakarta, Indonesia (Hybrid)",
    requirements: ["Portfolio desain UI/UX", "Mahir Figma", "Pemahaman design thinking"],
    benefits: ["Remote-friendly", "Akses ke design system skala besar", "Networking industri"],
    featured: true,
  },
  {
    slug: "business-plan-competition-ui",
    title: "Business Plan Competition",
    organization: "Universitas Indonesia",
    category: "lomba",
    deadline: "25 Mei 2024",
    deadlineUrgent: true,
    description: "Kompetisi rencana bisnis untuk mahasiswa dengan pitch deck, financial projection, dan presentasi live.",
    location: "Depok, Indonesia",
    requirements: ["Tim 2-4 orang", "Business plan lengkap", "Pitch deck maksimal 15 slide"],
    benefits: ["Modal seed Rp 50 juta", "Inkubasi startup", "Mentoring dari VC"],
    featured: true,
  },
  {
    slug: "lpdp-beasiswa-2024",
    title: "Beasiswa LPDP 2024",
    organization: "LPDP Kemenkeu",
    category: "beasiswa",
    deadline: "15 Agu 2024",
    description: "Beasiswa pendidikan dalam dan luar negeri untuk generasi emas Indonesia.",
    location: "Indonesia & Luar Negeri",
    requirements: ["Lulusan S1/S2", "LoA dari universitas tujuan", "Essay dan wawancara"],
    benefits: ["Biaya pendidikan penuh", "Living allowance", "Tunjangan penelitian"],
    featured: false,
  },
  {
    slug: "tokopedia-product-intern",
    title: "Product Management Intern",
    organization: "Tokopedia",
    category: "magang",
    deadline: "30 Jun 2024",
    description: "Magang product management di salah satu marketplace terbesar di Indonesia.",
    location: "Jakarta, Indonesia",
    requirements: ["Analytical thinking", "Data-driven mindset", "Komunikasi efektif"],
    benefits: ["Exposure ke product lifecycle", "Cross-functional collaboration"],
    featured: false,
  },
];

async function main() {
  console.log("Seeding database...");

  // Create Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@beafind.com" },
    update: {},
    create: {
      name: "Admin BeaFind",
      email: "admin@beafind.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin.email);

  // Seed opportunities
  for (const opp of opportunities) {
    await prisma.opportunity.upsert({
      where: { slug: opp.slug },
      update: {},
      create: {
        ...opp,
        status: "APPROVED",
        authorId: admin.id,
      },
    });
  }

  console.log("Opportunities seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
