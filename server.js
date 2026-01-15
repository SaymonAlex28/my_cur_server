import http from "node:http";
import https from "node:https";

const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  if (req.url === "/ecb") {
    https.get(
      "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
      (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          res.writeHead(200, {
            "Content-Type": "application/xml",
            "Access-Control-Allow-Origin": "*", // <- разрешаем CORS
          });
          res.end(data);
        });
      }
    ).on("error", (err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Ошибка: " + err.message);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(PORT, () => console.log(`Proxy запущен на http://localhost:${PORT}/ecb`));
