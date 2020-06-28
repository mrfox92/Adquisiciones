import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //  creamos nuestro menu en un array de objetos

  public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-book-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Adquisiciones', url: '/adquisiciones' },
        { titulo: 'Despachadores', url: '/despachadores' },
        { titulo: 'Proveedores', url: '/proveedores' },
        { titulo: 'Facturas', url: '/facturas' },
        { titulo: 'Materiales', url: '/materiales' },
        { titulo: 'Ingresos Materiales', url: '/ingresos' },
        { titulo: 'Ordenes Despacho', url: '/ordenes' },
        { titulo: 'Departamentos', url: '/departamentos' },
        { titulo: 'Oficinas', url: '/oficinas' },
      ]
    }
  ];

  constructor() { }
}
