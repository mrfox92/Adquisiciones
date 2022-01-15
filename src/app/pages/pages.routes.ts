import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuardGuard } from '../services/service.index';
import { UsersComponent } from './users/users.component';
import { ProvidersComponent } from './providers/providers.component';
import { CreateProviderComponent } from './providers/create-provider.component';
import { EditProviderComponent } from './providers/edit-provider.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CreateDepartmentComponent } from './departments/create-department.component';
import { EditDepartmentComponent } from './departments/edit-department.component';
import { OfficesComponent } from './offices/offices.component';
import { CreateOfficeComponent } from './offices/create-office.component';
import { EditOfficeComponent } from './offices/edit-office.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CreateInvoiceComponent } from './invoices/create-invoice.component';
import { EditInvoiceComponent } from './invoices/edit-invoice.component';
import { CreateMaterialComponent } from './materials/create-material.component';
import { UpdateMaterialComponent } from './materials/update-material.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateOrderComponent } from './orders/create-order.component';
import { EditOrderComponent } from './orders/edit-order.component';
import { ShowOrderDetailComponent } from './orders/show-order-detail.component';
import { MaterialRegisterComponent } from './material-register/material-register.component';
import { DispatchersComponent } from './dispatchers/dispatchers.component';
import { StocktakingComponent } from './dispatchers/stocktaking.component';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialComponent } from './dispatchers/material.component';
import { OrderComponent } from './dispatchers/order.component';
import { CheckoutComponent } from './dispatchers/checkout.component';
import { MyOrdersComponent } from './dispatchers/my-orders.component';
import { SearchMaterialComponent } from './dispatchers/search-material.component';
import { InvoicesProviderComponent } from './providers/invoices-provider.component';
import { OutofstockComponent } from './materials/outofstock.component';
import { GraficasComponent } from './graficas/graficas.component';
import { AdminGuardGuard } from '../services/guards/admin-guard.guard';
import { OficinasMesAnioComponent } from './graficas/oficinas-mes-anio.component';
import { GraficasPedidosComponent } from './graficas/graficas-pedidos.component';
import { GraficasPedidosOficinasAnioComponent } from './graficas/graficas-pedidos-oficinas-anio.component';
import { GraficaFacturasComponent } from './graficas/grafica-facturas.component';
import { OrdersAdminComponent } from './orders/orders-admin.component';

//  todas las rutas tienen una propiedad llamada data, con la cual podemos agregar un titulo a nuestra url mas amigable

const pagesRoutes: Routes = [
    {
            path: '',
            component: PagesComponent,
            canActivate: [ LoginGuardGuard ],
            children: [

                { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
                { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
                { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
                { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
                { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
                { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
                //  Mantenimientos
                { path: 'usuarios', component: UsersComponent,
                    canActivate: [ AdminGuardGuard ],
                    data: { titulo: 'Mantenimiento de Usuarios' }
                },
                { path: 'despachadores', component: DispatchersComponent, data: { titulo: 'Despachadores' } },
                { path: 'inventario', component: StocktakingComponent, data: { titulo: 'Inventario' } },
                { path: 'inventario/detail/:id', component: MaterialComponent, data: { titulo: 'Detalle material' } },
                { path: 'pedido/:id', component: OrderComponent, data: { titulo: 'Orden pedido materiales' } },
                { path: 'checkout/:id', component: CheckoutComponent, data: { titulo: 'Finalizar orden materiales' } },
                { path: 'mis-ordenes', component: MyOrdersComponent, data: { titulo: 'Mis ordenes' } },
                { path: 'busqueda/:termino', component: SearchMaterialComponent, data: { titulo: 'Buscar Material' } },
                { path: 'ingresos', component: MaterialRegisterComponent, data: { titulo: 'Ingreso de materiales' } },
                { path: 'materiales', component: MaterialsComponent, data: { titulo: 'Mantenimiento de Materiales' } },
                // { path: 'materiales/agregar', component: CreateMaterialComponent, data: { titulo: 'Registrar nuevo material' } },
                { path: 'materiales/agotados', component: OutofstockComponent, data: { titulo: 'Materiales agotados' } },
                { path: 'materiales/edit/:id', component: UpdateMaterialComponent, data: { titulo: 'Editar Material' } },
                { path: 'ordenes', component: OrdersComponent, data: { titulo: 'Mantenimiento de ordenes despacho' } },
                { path: 'ordenes/agregar', component: CreateOrderComponent, data: { titulo: 'Regisrar nueva orden' } },
                { path: 'ordenes/edit/:id', component: EditOrderComponent, data: { titulo: 'Editar orden' } },
                { path: 'ordenes/detail/:id', component: ShowOrderDetailComponent, data: { titulo: 'Detalle orden' } },
                { path: 'departamentos', component: DepartmentsComponent, data: { titulo: 'Mantenimiento de Departamentos' } },
                { path: 'oficinas', component: OfficesComponent, data: { titulo: 'Mantenimiento de oficinas' } },
                { path: 'oficinas/agregar', component: CreateOfficeComponent, data: { titulo: 'Registrar nueva oficina' } },
                { path: 'oficinas/editar/:id', component: EditOfficeComponent, data: { titulo: 'Editar oficina' } },
                { path: 'departamentos/agregar', component: CreateDepartmentComponent, data: { titulo: 'Registrar nuevo departamento' } },
                { path: 'departamentos/editar/:id', component: EditDepartmentComponent, data: { titulo: 'Editar departamento' } },
                { path: 'proveedores', component: ProvidersComponent, data: { titulo: 'Mantenimiento de Proveedores' } },
                { path: 'proveedores/agregar', component: CreateProviderComponent, data: { titulo: 'Registrar nuevo proveedor' } },
                { path: 'proveedores/edit/:id', component: EditProviderComponent, data: { titulo: 'Editar proveedor' } },
                { path: 'proveedores/detail/:id', component: InvoicesProviderComponent, data: { titulo: 'Facturas proveedor' } },
                { path: 'facturas', component: InvoicesComponent, data: { titulo: 'Mantenimiento de facturas' } },
                { path: 'facturas/agregar', component: CreateInvoiceComponent, data: { titulo: 'Registrar nueva factura' } },
                { path: 'facturas/edit/:id', component: EditInvoiceComponent, data: { titulo: 'Editar factura' } },
                { path: 'graficas', component: GraficasComponent, canActivate: [ AdminGuardGuard ], data: { titulo: 'Graficos' } },
                { path: 'graficas/facturas/:anio', component: GraficaFacturasComponent,canActivate: [ AdminGuardGuard ], data: { titulo: 'Graficas facturas' } },
                { path: 'graficas/compare/:from/:to', component: GraficasPedidosComponent, canActivate: [ AdminGuardGuard ], data: { titulo: 'Graficos pedidos' } },
                { path: 'graficas/pedidos/oficinas/:anio', component: GraficasPedidosOficinasAnioComponent,canActivate: [ AdminGuardGuard ], data: { titulo: 'Graficos pedidos oficinas' } },
                { path: 'graficas/oficinas/:mes/:anio', component: OficinasMesAnioComponent, canActivate: [ AdminGuardGuard ], data: { titulo: 'Grafica oficinas por mes y año' } },
                { path: 'orders-admin', component: OrdersAdminComponent, canActivate: [ AdminGuardGuard ], data: { titulo: 'Ordenes' } },
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            ]
        }
];

//  exportamos nuestro modulo de rutas para utilizar en otro lugar
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
