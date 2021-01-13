// excel download
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export class ExcelDownload {

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        const today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '_' + today.getHours() + '_' + today.getMinutes() + '_' + today.getSeconds();
        fileName = fileName + '_export_' + date;
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }
}
