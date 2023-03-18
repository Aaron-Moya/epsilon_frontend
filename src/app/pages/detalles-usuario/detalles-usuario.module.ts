import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesUsuarioRoutingModule } from './detalles-usuario-routing.module';
import { DetallesUsuarioComponent } from './detalles-usuario.component';

import { MaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [
    DetallesUsuarioComponent
  ],
  imports: [
    CommonModule,
    DetallesUsuarioRoutingModule,
    MaterialModule
  ]
})
export class DetallesUsuarioModule { }
