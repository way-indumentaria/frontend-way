import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { IVendedor } from "../models/vendedor";

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {

  constructor( private http:HttpClient ) { }

  getVendedores(){

    return this.http.get<IVendedor[]>('https://backend-way-indumentaria.herokuapp.com/vendedores');


   }

   saveVendedores(unVendedor:IVendedor){

    return this.http.post('https://backend-way-indumentaria.herokuapp.com/vendedores', unVendedor);
    

   }

   updateVendedor(unVendedor:IVendedor){

    let id:number = unVendedor.id_vendedor;

    return this.http.put('https://backend-way-indumentaria.herokuapp.com/vendedores/'+id,unVendedor);


   }


   deleteVendedor(id:number){

    return this.http.delete('https://backend-way-indumentaria.herokuapp.com/vendedores/' +id);
   }

}
