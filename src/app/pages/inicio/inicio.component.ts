import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/shared/interfaces/categorias';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
