const app = require("./src/app");
const env = require("./src/config/env");

if (process.env.NODE_ENV !== "production") {
  app.listen(env.port, () => {
    console.log(`🚀 Server Backend berjalan di http://localhost:${env.port}`);
  });
}

module.exports = app;