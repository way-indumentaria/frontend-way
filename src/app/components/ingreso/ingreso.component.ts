import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators} from "@angular/forms";
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  formIngreso:FormGroup;
 
  constructor(private fb: FormBuilder, private autServe:AutenticacionService, private route:Router) { 

    this.formIngreso = this.fb.group({
      
      // descripcion:['']
      username:['', [Validators.required]],
      password:['', [Validators.required]],
      
      

    })
  }

  ngOnInit(): void {
  }



    ingresar(){
      this.autServe.login(this.formIngreso.value).subscribe(

        respuesta => {
          if(respuesta == 1){
            alert('El usuario o la contraseña son incorrectos');

          }else{

            if( respuesta == 0){

              alert('La contraseña es incorrecta');
            }else{
               localStorage.setItem('token',String(respuesta));
               this.formIngreso.reset();
               this.route.navigate(['/ventas']);
              
            }
          }
          
          
        }, error => console.log(error)
      )

    }
}
