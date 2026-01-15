const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint /ecb
app.get("/ecb", async (req, res) => {
  try {
    const response = await fetch("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");
    const data = await response.text();
    res.set("Content-Type", "application/xml");
    res.send(data);
  } catch (error) {
    console.error("Ошибка получения данных ECB:", error);
    res.status(500).send("Ошибка получения данных ECB");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy запущен на http://localhost:${PORT}/ecb`);
});
