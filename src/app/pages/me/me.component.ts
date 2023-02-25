import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  tableroSeleccionado = false;
  bibliotecaSeleccionado = false;
  pedidosSeleccionado = false;
  perfilSeleccionado = false;
  misAnunciosSeleccionado = false;
  crearAnuncioSeleccionado = false;

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarTablero(): void {
    this.tableroSeleccionado = true;
    this.misAnunciosSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.perfilSeleccionado = false;
  }

  seleccionarBiblioteca(): void {
    this.bibliotecaSeleccionado = true;
    this.tableroSeleccionado = false;
    this.misAnunciosSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.perfilSeleccionado = false;
  }

  seleccionarPedidos(): void {
    this.pedidosSeleccionado = true;
    this.bibliotecaSeleccionado = false;
    this.tableroSeleccionado = false;
    this.misAnunciosSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
    this.perfilSeleccionado = false;
  }

  seleccionarPerfil(): void {
    this.perfilSeleccionado = true;
    this.misAnunciosSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.tableroSeleccionado = false;
    this.crearAnuncioSeleccionado = false;
  }

  seleccionarMisAnuncios(): void {
    this.misAnunciosSeleccionado = true;
    this.crearAnuncioSeleccionado = false;
    this.tableroSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.perfilSeleccionado = false;
  }

  seleccionarCrearAnuncio(): void {
    this.crearAnuncioSeleccionado = true;
    this.tableroSeleccionado = false;
    this.bibliotecaSeleccionado = false;
    this.pedidosSeleccionado = false;
    this.perfilSeleccionado = false;
    this.misAnunciosSeleccionado = false;
  }
}
