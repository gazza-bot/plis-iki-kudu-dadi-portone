const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Mengizinkan React mengakses API ini
app.use(express.json());

// Dummy Data Projek (Nanti bisa diganti dengan query Database)
const projects = [
  {
    id: "1",
    judul: "Portfolio Website",
    desc: "Website portfolio interaktif menggunakan React, TypeScript, dan Tailwind CSS.",
    url: "https://picsum.photos/seed/project1/600/400",
    badgeText: ["React", "TypeScript", "Tailwind"]
  },
  {
    id: "2",
    judul: "RESTful API Service",
    desc: "Backend service untuk manajemen data projek menggunakan Node.js dan Express.",
    url: "https://picsum.photos/seed/project2/600/400",
    badgeText: ["Node.js", "Express"]
  },
  {
    id: "3",
    judul: "Bla Bla Bla",
    desc: "Backend service untuk manajemen data projek menggunakan Node.js dan Express.",
    url: "https://picsum.photos/seed/project2/600/400",
    badgeText: ["Node.js", "Express"]
  }
];

// Endpoint API
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`🚀 Server Backend berjalan di http://localhost:${PORT}`);
});