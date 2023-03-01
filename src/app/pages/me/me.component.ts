import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  opcionMenu!: any;

  tableroSeleccionado = false;
  bibliotecaSeleccionado = false;
  pedidosSeleccionado = false;
  perfilSeleccionado = false;
  ventasSeleccionado = false;
  misAnunciosSeleccionado = false;
  crearAnuncioSeleccionado = false;

  constructor(private router: Router) { 
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state != undefined) this.opcionMenu = state['opcionMenu'];
  }

  ngOnInit(): void {
    this.seleccionarOpcionMenu();
  }

  seleccionarOpcionMenu(): void {
    if (this.opcionMenu == "tablero") this.seleccionarTablero();
    if (this.opcionMenu == "biblioteca") this.seleccionarBiblioteca();
    if (this.opcionMenu == "pedidos") this.seleccionarPedidos();
    if (this.opcionMenu == "perfil") this.seleccionarPerfil();
    if (this.opcionMenu == "ventas") this.seleccionarVentas();
    if (this.opcionMenu == "anuncios") this.seleccionarMisAnuncios();
    if (this.opcionMenu == "crearAnuncio") this.seleccionarCrearAnuncio();
  }

  seleccionarTablero(): void {
    this.tableroSeleccionado = true;
    this.misAnunciosSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.ventasSeleccionado = false;
    this.perfilSeleccionado = false;
  }

  seleccionarBiblioteca(): void {
    this.bibliotecaSeleccionado = true;
    this.tableroSeleccionado = false;
    this.misAnunciosSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.ventasSeleccionado = false;
    this.perfilSeleccionado = false;
  }

  seleccionarPedidos(): void {
    this.pedidosSeleccionado = true;
    this.bibliotecaSeleccionado = false;
    this.tableroSeleccionado = false;
    this.misAnunciosSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
    this.perfilSeleccionado = false;
    this.ventasSeleccionado = false;

  }

  seleccionarPerfil(): void {
    this.perfilSeleccionado = true;
    this.misAnunciosSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.tableroSeleccionado = false;
    this.ventasSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
  }

  seleccionarVentas(): void {
    this.ventasSeleccionado = true;
    this.perfilSeleccionado = false;
    this.misAnunciosSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.tableroSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
  }

  seleccionarMisAnuncios(): void {
    this.misAnunciosSeleccionado = true;
    this.crearAnuncioSeleccionado = false;
    this.ventasSeleccionado = false;
    this.tableroSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.perfilSeleccionado = false;
  }

  seleccionarCrearAnuncio(): void {
    this.crearAnuncioSeleccionado = true;
    this.ventasSeleccionado = false;
    this.tableroSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.perfilSeleccionado = false;
    this.misAnunciosSeleccionado = false;
  }
}
