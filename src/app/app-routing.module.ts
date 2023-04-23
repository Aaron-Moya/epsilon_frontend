import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './pages/inicio/lista-productos/lista-productos.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) },
  //{ path: 'anuncios', component: ListaProductosComponent },
  { path: 'anuncios', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'anuncios/:categoria', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'registro', loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'me', loadChildren: () => import('./pages/me/me.module').then(m => m.MeModule) },
  { path: 'producto/:id', loadChildren: () => import('./pages/detalles-producto/detalles-producto.module').then(m => m.DetallesProductoModule) },
  { path: 'favoritos', loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosModule) },
  { path: 'cesta', loadChildren: () => import('./pages/cesta/cesta.module').then(m => m.CestaModule) },
  { path: 'editar-anuncio/:idProducto', loadChildren: () => import('./pages/editar-anuncio/editar-anuncio.module').then(m => m.EditarAnuncioModule) },
  { path: 'usuario/:id', loadChildren: () => import('./pages/detalles-usuario/detalles-usuario.module').then(m => m.DetallesUsuarioModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
