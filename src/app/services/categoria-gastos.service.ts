import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

import { ICategoria_gasto } from "../models/categoria_gasto";

@Injectable({
  providedIn: 'root'
})
export class CategoriaGastosService {

  constructor(private http:HttpClient) { 
  }
      getcatGastos(){

        return this.http.get<ICategoria_gasto[]>('https://backend-way-indumentaria.herokuapp.com/categoria_gasto');
      }

      saveCategorias_gasto(unaCategoria_gasto:ICategoria_gasto){

        return this.http.post('https://backend-way-indumentaria.herokuapp.com/categoria_gasto', unaCategoria_gasto);
        
    
       }
       updateCategoria_gasto(unaCategoria_gasto:ICategoria_gasto){

        let id:number = unaCategoria_gasto.id_categoria_gasto;
    
        return this.http.put('https://backend-way-indumentaria.herokuapp.com/categoria_gasto/'+id,unaCategoria_gasto);
    
    
       }

       deleteCategoria_gasto(id:number){

        return this.http.delete('https://backend-way-indumentaria.herokuapp.com/categoria_gasto/' +id);
       }

 
}
