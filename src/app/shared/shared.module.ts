import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
//  modulo para trabajar con routerLink y routerLinkActive
import { RouterModule } from '@angular/router';
//  cargar directivas
import { CommonModule } from '@angular/common';
//  Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { CartItemComponent } from './cart-item/cart-item.component';


@NgModule({
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        NopagefoundComponent,
        CartItemComponent
    ],
    exports: [
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        NopagefoundComponent,
        CartItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule
    ]
})
export class SharedModule { }
