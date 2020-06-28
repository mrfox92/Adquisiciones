import { NgModule } from '@angular/core';
//  Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

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
        UpdateMaterialComponent
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
    ]

})
export class PagesModule { }
