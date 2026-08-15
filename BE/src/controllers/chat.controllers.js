const { askNimo } = require("../services/gemini.service");

async function postChat(req, res) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        error: "Pesan tidak boleh kosong!",
      });
    }
    const reply = await askNimo(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error Chat Service", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server AI" });
  }
}

module.exports = { postChat };
