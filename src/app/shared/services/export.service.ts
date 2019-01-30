import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
const PDF_TYPE = 'application/pdf';
const PDF_EXTENSION = '.pdf';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: PDF_TYPE });
    FileSaver.saveAs(data, fileName + PDF_EXTENSION);
  }
}
