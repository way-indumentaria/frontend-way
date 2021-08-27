
import { Component, OnInit } from '@angular/core';

import { ProvinciasService } from "../../services/provincias.service";

import { FormBuilder , FormGroup } from "@angular/forms";
import { IProvincia } from 'src/app/models/Provincia';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {

  listProvincias = [];

  formProvincia: FormGroup;

  class_button_sa:string = 'btn btn-success btn-sm';

  class_display:string = 'display:none';

  text_button:string = 'Guardar';

  p:number = 1;
  buscar:any;
      // crear una instancia de pagosServ
  constructor(private provinciasServ:ProvinciasService, private fb: FormBuilder) {

    this.formProvincia = this.fb.group({
      
      id_provincia:[],
      descripcion:['']


    })

   }

  ngOnInit(): void {
  this.obtenerProvincias();
  }

  obtenerProvincias(){
    this.provinciasServ.getProvincias().subscribe(
      resultado => this.listProvincias = resultado,
      error => console.log(error)
    )
  }

  guardarProvincia(){
    if (this.formProvincia.value.id_provincia){

       // si existe el id se actualiza
       this.provinciasServ.updateProvincia(this.formProvincia.value).subscribe(
        respuesta => {
          console.log(respuesta);
          this.obtenerProvincias();
          this.formProvincia.reset();
          this.text_button = 'Guardar';
          this.class_button_sa = 'btn btn-success btn-sm';
          this.class_display = 'display:none';
        },
        error => console.log(error)

    )


    }else{

      // si no existe lo guarda
    // console.log(this.formProvincia.value);
    this.provinciasServ.saveProvincias(this.formProvincia.value).subscribe(
      resultado => {
        console.log(resultado);
        this.obtenerProvincias();//se refresca la grilla
        this.formProvincia.reset();//se refresca el formulario
      },
      error => console.log(error)

    )}

  }

  editarProvincia(provincia:IProvincia){
    this.text_button = 'Actualizar';
    this.class_button_sa = 'btn btn-primary btn-sm';
    this.class_display = 'display:block';
     this.formProvincia.setValue({
       id_provincia:provincia.id_provincia,
       descripcion:provincia.descripcion,

     });
     
  }

  eliminarProvincia(id:number){

    if(confirm('¿Esta seguro que desea eliminar?')){

      this.provinciasServ.deleteProvincia(id).subscribe(
        respuesta =>{
          console.log(respuesta);
          this.obtenerProvincias();
  
        },
        error => console.log(error)
        
      )
    }
  }

  resetearformProvincia(){
    this.formProvincia.reset();
    this.text_button = 'Guardar';
    this.class_button_sa = 'btn btn-success btn-sm';
    this.class_display = 'display:none';
  }
    
}
