"use client";
import Button from "@mui/material/Button";
import * as XLSX from 'xlsx'

export const ExportExel = ({ json,what }: { json: any[],what:string }) => {

  const exportToExcel = async () => {
    const fileName = `Exported_${what}.xlsx`
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exported_Tasts');
  
    XLSX.writeFile(wb, fileName);
  };
  return <>
    <Button
      sx={{ color: "#2e7d32 !important;",marginLeft:"20px" }}
      variant="outlined"
      color="success"
      onClick={exportToExcel}
    >
      Export {what} to exel
    </Button>
  </>;
};
