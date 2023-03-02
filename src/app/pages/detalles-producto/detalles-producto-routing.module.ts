import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesProductoComponent } from './detalles-producto.component';

const routes: Routes = [{ path: '', component: DetallesProductoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallesProductoRoutingModule { }
