import http from "node:http";
import fetch from "node-fetch";

const PORT = process.env.PORT || 10000;

http.createServer(async (req, res) => {
  if (req.url === "/ecb") {
    try {
      const response = await fetch(
        "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
      );
      const data = await response.text();

      // Добавляем CORS заголовок
      res.writeHead(200, {
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*" // <- это разрешает все домены
      });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Ошибка: " + err.message);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(PORT, () => console.log(`Proxy запущен на http://localhost:${PORT}/ecb`));
