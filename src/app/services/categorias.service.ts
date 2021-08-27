import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICategoria } from "../models/categoria";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }
  getCategoria(){

    return this.http.get<ICategoria[]>('https://backend-way-indumentaria.herokuapp.com/categoria');
  }

  saveCategoria(unaCategoria:ICategoria){

    return this.http.post('https://backend-way-indumentaria.herokuapp.com/categoria', unaCategoria);
    

   }
   updateCategoria(unaCategoria:ICategoria){

    let id:number = unaCategoria.id_categoria;

    return this.http.put('https://backend-way-indumentaria.herokuapp.com/categoria/'+id,unaCategoria);


   }
   deleteCategoria(id:number){

    return this.http.delete('https://backend-way-indumentaria.herokuapp.com/categoria/' +id);
   }







}
