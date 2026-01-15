// Чистый Node.js, без express и node-fetch
const http = require("http");
const https = require("https");

const PORT = process.env.PORT || 3000;

// Функция для получения XML с ECB
function fetchECB(callback) {
  https.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", (res) => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => callback(null, data));
  }).on("error", (err) => callback(err));
}

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
  if (req.url === "/ecb") {
    fetchECB((err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Ошибка получения данных ECB");
        return;
      }
      res.writeHead(200, { "Content-Type": "application/xml" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Proxy запущен на http://localhost:${PORT}/ecb`);
});
