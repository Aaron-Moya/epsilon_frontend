import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.css']
})
export class CrearAnuncioComponent implements OnInit {
  imagen: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.imagen = target.files![0];
    }
  }
}
