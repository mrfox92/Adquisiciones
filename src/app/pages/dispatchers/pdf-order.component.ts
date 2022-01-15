import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-order',
  templateUrl: './pdf-order.component.html',
  styleUrls: ['./pdf-order.component.css']
})
export class PdfOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createdPdf()
  {
    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola mundo'
        }
      ]
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
  }

}
