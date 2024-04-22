// data.js
const sql = require('mssql');
const dbConfig = require('./config');

async function getEmpresaURL() {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query('SELECT nome, conexao FROM EMPRESAS WHERE status = \'A\'');
    return result.recordset;
  } catch (err) {
    console.error('Erro ao obter URL da empresa:', err);
    throw err;
  }
}

module.exports = {
  getEmpresaURL
};