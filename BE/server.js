const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables dari file .env
dotenv.config();
const projects = [
  {
    id: "1",
    judul: "Portfolio Website",
    desc: "Website portfolio interaktif menggunakan React, TypeScript, dan Tailwind CSS.",
    url: "https://picsum.photos/seed/project1/600/400",
    badgeText: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "2",
    judul: "RESTful API Service",
    desc: "Backend service untuk manajemen data projek menggunakan Node.js dan Express.",
    url: "https://picsum.photos/seed/project2/600/400",
    badgeText: ["Node.js", "Express"],
  },
  {
    id: "3",
    judul: "Bla Bla Bla",
    desc: "Backend service untuk manajemen data projek menggunakan Node.js dan Express.",
    url: "https://picsum.photos/seed/project2/600/400",
    badgeText: ["Node.js", "Express"],
  },
];

// Data Profil Kamu
const profile = {
  nama: "Adil Nibras Gazza",
  peran: "Mahasiswa IT",
  bio: "Mahasiswa yang sedang giat membangun portofolio, khususnya di FrontEnd Website serta UI/UX desain. Aktif mengikuti berbagai perlombaanguna mendapatkan pengalaman dan portofolio yang menarik.",
  targets: [
    "Kerja Efisien: Meriset segala hal agar produk dirancang sebaik mungkin dan meminimalkan kesalahan.",
    "Target Jelas: Perencanaan mudah dan pelaksanaan rapi agar output maksimal.",
    "Kode Terstruktur: Menulis kode yang bersih, rapi, dan mudah dirawat untuk jangka panjang.",
  ],
  skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js"],
  kontak: {
    email: "nibrasgazza@gmail.com",
    github: "github.com/gazza-bot",
    linkedin: "linkedin.com/in/adil-nibras-gazza",
  },
};

// Gabungkan Profil & Proyek ke dalam Instruksi Sistem AI
const systemInstruction = `
Kamu adalah AI Assistant resmi untuk portofolio milik ${profile.nama}.
Tugas utama kamu adalah menjawab pertanyaan pengunjung terkait profil, target kerja, keahlian, dan proyek milik ${profile.nama}.

=== INFORMASI PROFIL ===
${JSON.stringify(profile, null, 2)}

=== DAFTAR PROYEK ===
${JSON.stringify(projects, null, 2)}

Aturan Jawaban:
1. Jawab secara singkat, ramah, dan profesional dalam Bahasa Indonesia.
2. Manfaatkan data di atas untuk menjawab pertanyaan tentang keahlian, proyek, atau cara kerja ${profile.nama}.
3. Jangan memberikan informasi di luar data yang tersedia atau mengarang pengalaman.
4. Jangan gunakan jawaban berformat MD agar tidak ada simbol simbol yang mengganggu.
`;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan React mengakses API ini
app.use(express.json());

// Inisialisasi Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash",
  systemInstruction: systemInstruction,
});



// Endpoint API Projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Endpoint API Chatbot AI
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong" });
    }

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    res.json({ reply: responseText });
  } catch (error) {
    console.error("Error Gemini API:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server AI" });
  }
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`🚀 Server Backend berjalan di http://localhost:${PORT}`);
});
