import { Gif, SearchGifsResponse } from './../interface/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private _apiKey: string = 'O0SxeyEEqPLHVydF6QSMaQxv8RvgcmMZ';
  private _servicioUrl:string='https://api.giphy.com/v1/gifs';

  // Cambiar amy por si tipo corr
  public resultados: Gif[] = [];

  // Romper la referencia y regresar un nuevo arreglo
  get historial() {
    this._historial;
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    if (localStorage.getItem('historial')) {
      this._historial=JSON.parse(localStorage.getItem('historial')!);
      this.resultados=JSON.parse(localStorage.getItem('resultados')!)
    }
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);


      localStorage.setItem('historial', JSON.stringify(this._historial));

    }
    const params=new HttpParams().set('api_key', this._apiKey)
    .set('limit','10')
    .set('q',query)


    this.http
      .get<SearchGifsResponse>(
        `${this._servicioUrl}/search`,{params})
      .subscribe((response: SearchGifsResponse) => {
        console.log(response.data);
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      });
  }
}
