// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();

// Маршрут для курсов
app.get("/ecb", async (req, res) => {
  try {
    // Получаем XML напрямую с ECB
    const response = await fetch("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");
    const xml = await response.text();

    // Отправляем с CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.type("application/xml");
    res.send(xml);

  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка прокси");
  }
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log("Proxy запущен на http://localhost:3000/ecb");
});
