const fs = require("fs");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    server: {
      type: "https",
      options: {
        key: fs.readFileSync("./localhost-key.pem"),
        cert: fs.readFileSync("./localhost.pem"),
      },
    },
    port: 3000,
    allowedHosts: "all", // Mengizinkan semua host
    client: {
      webSocketURL: "wss://localhost:3000/ws",
    },
    webSocketServer: "ws",
  },
});
