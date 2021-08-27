import { Injectable } from '@angular/core';

  import { HttpClient } from "@angular/common/http";
import { IProvincia } from '../models/Provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
//  instancia para acceder a las herramientas de httpclient ( private http:HttpClient )
  constructor( private http:HttpClient ) {
   }

   getProvincias(){

    return this.http.get<IProvincia[]>('https://backend-way-indumentaria.herokuapp.com/provincias');

   }

   saveProvincias(unaProvincia:IProvincia){

    return this.http.post('https://backend-way-indumentaria.herokuapp.com/provincias', unaProvincia);
    

   }

   updateProvincia(unaProvincia:IProvincia){

    let id:number = unaProvincia.id_provincia;

    return this.http.put('https://backend-way-indumentaria.herokuapp.com/provincias/'+id,unaProvincia);


   }

   deleteProvincia(id:number){

    return this.http.delete('https://backend-way-indumentaria.herokuapp.com/provincias/' +id);
   }
}
