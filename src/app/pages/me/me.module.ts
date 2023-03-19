import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './me.component';
import { MaterialModule } from 'src/app/app-material.module';
import { CrearAnuncioComponent } from './crear-anuncio/crear-anuncio.component';
import { MisAnunciosComponent } from './mis-anuncios/mis-anuncios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    MeComponent,
    CrearAnuncioComponent,
    MisAnunciosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MeModule { }
