import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './me.component';
import { MaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    MaterialModule,
  ]
})
export class MeModule { }
