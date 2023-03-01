import { Gif, SearchGifsResponse } from 'src/app/gifs/interface/gifs.interface';
import { GifsService } from './../../gifs/services/gifs.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})


export class SidebarComponent {


  public resultados: Gif[] = [];
  constructor(private gifsService: GifsService) {

  }

  buscar(termino: string) {
    this.gifsService.buscarGifs(termino)
  }

  get historial() {
    return this.gifsService.historial;
  }
}
