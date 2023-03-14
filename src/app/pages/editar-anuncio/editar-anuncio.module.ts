import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarAnuncioRoutingModule } from './editar-anuncio-routing.module';
import { EditarAnuncioComponent } from './editar-anuncio.component';

import { MaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditarAnuncioComponent
  ],
  imports: [
    CommonModule,
    EditarAnuncioRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EditarAnuncioModule { }
