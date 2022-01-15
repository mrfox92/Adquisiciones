import { Component, OnInit } from '@angular/core';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];
  loading: boolean = false;
  search: boolean = false;
  busqueda: string = '';
  total: number = 0;
  currentPage: number = 0;
  lastPage: number = 0;
  firstPageUrl: string = null;
  lastPageUrl: string = null;
  nextPageUrl: string = null;
  prevPageUrl: string = null;

  constructor(
    private dispatchersService: DispatchersService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  async createPdf(order: any) {

    const pdfDefinition: any = {
      content: [
        {
          image: await this.getBase64ImageFromURL('./assets/images/logo-muni-pdf.jpg'),
          width: 50
        },
        {
          text: `Fecha documento: ${ new Date().toLocaleDateString() }`,
          style: 'text',
          alignment: 'right',
          margin: [0, 5]
        },
        {
          text: `Orden solicitud de retiro de materiales Adquisiciones`,
          style: 'header',
          alignment: 'center',
          margin: [0, 20]
        },
        {
          text: `Orden N° ${ order.id }`,
          style: 'subheader'
        },
        {
          text: `Retiro a oficina ${ order.offices[0].name }`,
          style: 'subheader'
        },
        {
          text: `Orden emitida por ${ order.dispatcher.user.name } ${ order.dispatcher.user.last_name }`,
          style: 'subheader'
        },
        {
          text: `Detalle Orden N° ${ order.id }`,
          style: 'subheader'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*', 200, 'auto'],
            body: this.getTableBody( order.materials_orders, ['Id', 'Cod Barras', 'Material', 'Cantidad'] )
          }
        },
        {
          text: `Con fecha de ${ new Date( order.created_at ).toLocaleDateString() } se ha creado una nueva orden de retiro materiales para oficina ${ order.offices[0].name }.`,
          style: 'subheader'
        },
        {
          text: `Responsable retiro materiales sr(a) ${ order.name_responsible }`,
          style: 'subheader'
        },
        {
          text: 'Nota*: Si se detecta irregularidades en la orden de materiales solicitados podría ser anulada',
          style: 'subheader'
        },

        {
          text: `Firma encargado(a) Adquisiciones`,
          style: 'subheader',
          margin: [0, 50],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    // pdf.download();
  }

  getBase64ImageFromURL(url) {

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  getTableBody(materiales, columnas) {
    const body = [];

    body.push( columnas );

    materiales.forEach( material => {
      const celda = [material.material.id, material.material.bar_code, material.material.name, material.quantity];
      body.push(celda);
    });

    return body;
  }


  getOrders() {
    this.loading = true;
    this.dispatchersService.getMyOrders().subscribe( resp => {

      if ( resp.status === 'success' && resp.code === 200 ) {

        // console.log( resp );
        this.orders = resp.orders.data;
        console.log( this.orders );
        this.loading = false;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
      }
    });
  }


  prevPage() {

    if ( !this.prevPageUrl ) {
      console.log('No hay página anterior');
      return;
    }

    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.dispatchersService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' && resp.code === 200 ) {
        // console.log( resp );
        this.orders = resp.orders.data;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
        this.loading = false;
      }

    },
    error => console.log( error ));

  }

  nextPage() {

    if ( !this.nextPageUrl ) {
      console.log('No hay página siguiente');
      return;
    }

    //  evaluamos si viene una busqueda válida
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.dispatchersService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' && resp.code === 200 ) {
        // console.log( resp );
        this.orders = resp.orders.data;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  buscarOrden( busqueda: string ) {
    // console.log( busqueda );
    this.busqueda = busqueda.trim();
    if ( this.busqueda.length <= 0 ) {
      console.log('Busqueda vacia');
      this.busqueda = '';
      this.getOrders();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.dispatchersService.searchOrder( this.busqueda ).subscribe( (resp: any) => {
      // console.log( resp );
      if ( resp.status === 'success' && resp.code === 200 ) {
        this.orders = resp.orders.data;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
        this.loading = false;
      }

    },
    error => {
      console.log('Ha ocurrido un error');
      // console.log( error );
      this.orders = [];
      this.loading = false;
    });
  }

}
