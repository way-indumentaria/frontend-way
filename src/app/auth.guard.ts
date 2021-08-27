import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AutenticacionService } from "./services/autenticacion.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private autServe:AutenticacionService, private route:Router){

  }
  canActivate(){
    if(this.autServe.verificarUsuarioLogueado() == true){
    return true;
  
  }else {
    this.route.navigate(['./ingreso']);
    return false;
  }
    
  }
  
}
