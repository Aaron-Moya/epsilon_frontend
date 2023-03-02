import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesProductoRoutingModule } from './detalles-producto-routing.module';
import { DetallesProductoComponent } from './detalles-producto.component';
import { MaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [
    DetallesProductoComponent
  ],
  imports: [
    CommonModule,
    DetallesProductoRoutingModule,
    MaterialModule
  ]
})
export class DetallesProductoModule { }
