const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");
const profile = require("../data/profile");
const projects = require("../data/projects");

function buildSystemInstruction() {
  return `
Kamu adalah AI Assistant resmi untuk portofolio milik ${profile.nama}.
Nama Kamu Adalah Nimo
Tugas utama kamu adalah menjawab pertanyaan pengunjung terkait profil, target kerja, keahlian, dan proyek milik ${profile.nama}.


=== INFORMASI PROFIL ===
${JSON.stringify(profile, null, 2)}

=== DAFTAR PROYEK ===
${JSON.stringify(projects, null, 2)}

PENTING : Jika Pengunjung Website ingin menghubungi ${profile.nama}, Arahkan ke tombol Let's Connect atau Footer yang mengandung kontak ${profile.nama}

Aturan Jawaban:
1. Jawab secara singkat, ramah, dan gunakan Bahasa Gen-Z dalam Bahasa Indonesia.
2. Manfaatkan data di atas untuk menjawab pertanyaan tentang keahlian, proyek, atau cara kerja ${profile.nama}.
3. Jangan memberikan informasi di luar data yang tersedia atau mengarang pengalaman.
4. Jangan gunakan jawaban berformat MD agar tidak ada simbol simbol yang mengganggu.
`;
}

const genAI = new GoogleGenerativeAI(env.geminiApiKey);
const model = genAI.getGenerativeModel({
  model: env.geminiModel,
  systemInstruction: buildSystemInstruction(),
});

async function askNimo(message) {
  const result = await model.generateContent(message);
  const responseText = result.response.text();
  return responseText;
}

module.exports = { askNimo };