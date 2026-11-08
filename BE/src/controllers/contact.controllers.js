const env = require("../config/env");

async function postContact(req, res) {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.resendApiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        from: env.contactFromEmail,
        to: [env.contactToEmail],
        reply_to: email,
        subject,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("Resend returned a non-JSON response.");
      return res.status(502).json({
        error: "Email provider returned an invalid response.",
      });
    }

    if (response.ok && data.id) {
      return res.status(200).json({ success: true, message: "Message sent." });
    }

    console.error("Resend contact delivery failed:", {
      status: response.status,
      message: data.message,
    });
    return res.status(502).json({ error: "Email delivery failed." });

  } catch (error) {
    console.error("Error Contact Service:", error);
    return res.status(500).json({ error: "A server error occurred." });
  }
}

module.exports = { postContact };