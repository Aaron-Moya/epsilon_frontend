import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    HeaderComponent,
    
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }