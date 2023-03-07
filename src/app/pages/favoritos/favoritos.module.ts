import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritosRoutingModule } from './favoritos-routing.module';
import { FavoritosComponent } from './favoritos.component';
import { MaterialModule } from 'src/app/app-material.module';


@NgModule({
  declarations: [
    FavoritosComponent
  ],
  imports: [
    CommonModule,
    FavoritosRoutingModule,
    MaterialModule
  ]
})
export class FavoritosModule { }
