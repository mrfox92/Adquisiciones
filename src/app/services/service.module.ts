import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  MaterialsService,
  ProvidersService,
  DepartmentsService,
  OfficesService,
  InvoicesService,
  AcquisitionsService,
  OrdersService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  //  proveemos nuestros servicios
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    UploadFileService,
    MaterialsService,
    ProvidersService,
    DepartmentsService,
    OfficesService,
    InvoicesService,
    AcquisitionsService,
    OrdersService
  ]
})
export class ServiceModule { }
