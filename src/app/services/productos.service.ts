import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { IProducto } from "../models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) {

  }
  getProductos()
   {
      return this.http.get<IProducto[]>('https://backend-way-indumentaria.herokuapp.com/producto');
   }

  saveProducto(unProducto:IProducto)
  {
    unProducto.fecha_carga=unProducto.fecha_carga.year+'-'+unProducto.fecha_carga.month+'-'+unProducto.fecha_carga.day;
    return this.http.post('https://backend-way-indumentaria.herokuapp.com/producto',unProducto);
  }

  updateProducto(unProducto:IProducto)
  {
    let id:number = unProducto.id_producto;
    unProducto.fecha_carga=unProducto.fecha_carga.year+'-'+unProducto.fecha_carga.month+'-'+unProducto.fecha_carga.day;
    return this.http.put('https://backend-way-indumentaria.herokuapp.com/producto/'+id,unProducto);
  }

  deleteProducto(id:number)
  {
    return this.http.delete('https://backend-way-indumentaria.herokuapp.com/producto/'+id);
  }

}
