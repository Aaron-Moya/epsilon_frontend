import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CestaRoutingModule } from './cesta-routing.module';
import { CestaComponent } from './cesta.component';
import { MaterialModule } from 'src/app/app-material.module';


@NgModule({
  declarations: [
    CestaComponent
  ],
  imports: [
    CommonModule,
    CestaRoutingModule,
    MaterialModule
  ]
})
export class CestaModule { }
