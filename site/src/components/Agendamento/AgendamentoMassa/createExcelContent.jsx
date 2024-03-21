import * as XLSX from 'xlsx';

const createExcelContent = () => {
  const data = [
    ["visDoc", "visName", "visEmail", "visTel"]
  ];

  // Criando uma nova planilha
  const workbook = XLSX.utils.book_new();

  // Criando uma nova folha na planilha
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Aplicando estilos ao cabeçalho
  const headerCellStyle = {
    font: { bold: true, color: { rgb: "ffffff" } },
    fill: { fgColor: { rgb: "000000" } },
    alignment: { horizontal: "center" }
  };

  // Iterando sobre as células do cabeçalho para aplicar estilos
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let col = range.s.c; col <= range.e.c; col++) {
    const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[headerCell]) continue;
    worksheet[headerCell].s = headerCellStyle;
  }

  worksheet['!cols'] = [{ width: 15 }, { width: 20 }, { width: 25 }, { width: 15 }];

  // Adicionando a folha à planilha
  XLSX.utils.book_append_sheet(workbook, worksheet, "Agendamento1");

  // Convertendo a planilha para um arquivo binário Excel
  const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

  // Convertendo o arquivo binário para um blob
  const excelBlob = new Blob([s2ab(excelFile)], { type: "application/octet-stream" });

  // Criando um URL para o blob
  const excelUrl = URL.createObjectURL(excelBlob);

  // Criando um link para o arquivo Excel e disparar o download
  const downloadLink = document.createElement('a');
  downloadLink.href = excelUrl;
  downloadLink.download = 'agendamento.xlsx';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// Função auxiliar para converter string em array de bytes
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export { createExcelContent };