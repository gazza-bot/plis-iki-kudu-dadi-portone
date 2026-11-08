const env = require("../config/env");

async function postContact(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    const formData = new FormData();
    formData.append("access_key", env.web3formsKey);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return res.json({ success: true });
    }

    return res.status(502).json({ error: "Gagal mengirim pesan ke Web3Forms." });
  } catch (error) {
    console.error("Error Contact Service", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}

module.exports = { postContact };
