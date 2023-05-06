import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './me.component';
import { MaterialModule } from 'src/app/app-material.module';
import { CrearAnuncioComponent } from './crear-anuncio/crear-anuncio.component';
import { MisAnunciosComponent } from './mis-anuncios/mis-anuncios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { VentasComponent } from './ventas/ventas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { TableroComponent } from './tablero/tablero.component';

@NgModule({
  declarations: [
    MeComponent,
    CrearAnuncioComponent,
    MisAnunciosComponent,
    PerfilComponent,
    VentasComponent,
    PedidosComponent,
    BibliotecaComponent,
    TableroComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MeModule { }
