import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MaterialModule } from 'src/app/app-material.module';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';

@NgModule({
  declarations: [
    InicioComponent,
    ListaProductosComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MaterialModule
  ]
})
export class InicioModule { }
