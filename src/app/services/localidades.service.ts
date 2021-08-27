import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ILocalidad } from "../models/localidad";

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  constructor(private http:HttpClient) {

  }

  getLocalidades()
   {
      return this.http.get<ILocalidad[]>('https://backend-way-indumentaria.herokuapp.com/localidades');
   }

   saveLocalidad(unaLocalidad:ILocalidad)
   {
      return this.http.post('https://backend-way-indumentaria.herokuapp.com/localidades',unaLocalidad);
   }

   updateLocalidad(unaLocalidad:ILocalidad)
   {
      let id:number = unaLocalidad.id_localidad;

      return this.http.put('https://backend-way-indumentaria.herokuapp.com/localidades/'+id,unaLocalidad);
   }

   deleteLocalidad(id:number)
   {
      return this.http.delete('https://backend-way-indumentaria.herokuapp.com/localidades/'+id);
   }
}
