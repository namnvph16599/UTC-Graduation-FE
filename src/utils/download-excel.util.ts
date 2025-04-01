export const downloadExcel = (data: string, fileName: string) => {
  const linkSource = `data:application/vnd.ms-excel;base64,${data}`;
  const downloadLink = document.createElement('a');
  const fileNameXLSX = `${fileName}.xlsx`;

  downloadLink.href = linkSource;
  downloadLink.download = fileNameXLSX;
  downloadLink.click();
};
