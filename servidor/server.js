const express = require('express');
const cors = require('cors');
const app = express();

// Middleware CORS usando o pacote cors
app.use(cors({ origin: ['https://localhost:7243'] }));

app.use(express.json());

const PORT = 7245;
app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`);
});