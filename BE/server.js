const app = require("./src/app")
const env = require("./src/config/env")
app.listen(env.port, () => {
  console.log(`🚀 Server Backend berjalan di http://localhost:${env.port}`);
});
