const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/url/:empresaId', async (req, res) => {
  const empresaId = req.params.empresaId;
  try {
    const url = await data.getEmpresaURL(empresaId);
    res.json({ url });
    console.log(url);
  } catch (err) {
    console.error('Erro ao processar solicitação:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const PORT = 7245;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});