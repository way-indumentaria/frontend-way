import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators} from "@angular/forms";
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro:FormGroup;

  constructor(private fb: FormBuilder, private autServe:AutenticacionService, private route:Router) {

    this.formRegistro = this.fb.group({
      
      // descripcion:['']
      username:['', [Validators.required]],
      password:['', [Validators.required]],
      email:['', [Validators.required]],

    })
   }

  ngOnInit(): void {
  }


   registrar(){
    this.autServe.register(this.formRegistro.value).subscribe(

      respuesta => { 
        localStorage.setItem('token',String(respuesta));
        this.formRegistro.reset();
        this.route.navigate(['/vendedor']);
      }, error => console.log(error)
    )
     
   }


}
