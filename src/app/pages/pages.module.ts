import { NgModule } from '@angular/core';
//  Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

//  Ng2-completer
import { Ng2CompleterModule } from 'ng2-completer';
//  Ng-Wizard
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
//  theme ng wizard
const ngWizardConfig: NgWizardConfig = {
    theme: THEME.default
  };

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
//  Graficas
import { ChartsModule } from 'ng2-charts';
//  componente grafica
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
//  pipes
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
//  directivas de angular
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MaterialsComponent } from './materials/materials.component';
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
import { MaterialRegisterCreateComponent } from './material-register/material-register-create.component';
import { DispatchersComponent } from './dispatchers/dispatchers.component';
import { StocktakingComponent } from './dispatchers/stocktaking.component';
import { MaterialComponent } from './dispatchers/material.component';
import { OrderComponent } from './dispatchers/order.component';
import { CheckoutComponent } from './dispatchers/checkout.component';
import { MyOrdersComponent } from './dispatchers/my-orders.component';
import { SearchMaterialComponent } from './dispatchers/search-material.component';
import { InvoicesProviderComponent } from './providers/invoices-provider.component';
import { OutofstockComponent } from './materials/outofstock.component';


@NgModule({

    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        MaterialsComponent,
        ProvidersComponent,
        CreateProviderComponent,
        EditProviderComponent,
        DepartmentsComponent,
        CreateDepartmentComponent,
        EditDepartmentComponent,
        OfficesComponent,
        CreateOfficeComponent,
        EditOfficeComponent,
        InvoicesComponent,
        CreateInvoiceComponent,
        EditInvoiceComponent,
        CreateMaterialComponent,
        UpdateMaterialComponent,
        OrdersComponent,
        CreateOrderComponent,
        EditOrderComponent,
        ShowOrderDetailComponent,
        MaterialRegisterComponent,
        MaterialRegisterCreateComponent,
        DispatchersComponent,
        StocktakingComponent,
        MaterialComponent,
        OrderComponent,
        CheckoutComponent,
        MyOrdersComponent,
        SearchMaterialComponent,
        InvoicesProviderComponent,
        OutofstockComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        PipesModule,
        Ng2CompleterModule,
        NgWizardModule.forRoot(ngWizardConfig)
    ]

})
export class PagesModule { }
