// data.js
const sql = require('mssql');
const dbConfig = require('./config');

async function getEmpresaURL(empresaId) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('empresaId', sql.Int, empresaId)
      .query('SELECT conexao FROM EMPRESAS WHERE contrato = @empresaId');

    console.log(result.recordset[0]);
    return result.recordset[0].conexao;
  } catch (err) {
    console.error('Erro ao obter URL da empresa:', err);
    throw err;
  }
}

module.exports = {
  getEmpresaURL
};