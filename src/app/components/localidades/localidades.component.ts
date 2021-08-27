import { Component, OnInit } from '@angular/core';

import { LocalidadesService } from "../../services/localidades.service";

import { FormBuilder , FormGroup } from "@angular/forms";

import { ProvinciasService } from "../../services/provincias.service";

import { ILocalidad } from "../../models/localidad";

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {

  listLocalidades = [];

  listLocProvincias = [];

  formLocalidad: FormGroup;

  class_button_sa:string = 'btn btn-success btn-sm';

  class_display:string = 'display:none';

  text_button:string = 'Guardar';

  p:number = 1;
  buscar:any;

  constructor(private localidadesServ:LocalidadesService, private fb: FormBuilder, private localidadesProvServ:ProvinciasService) { 

    this.formLocalidad = this.fb.group({
      id_localidad:[null],
      descripcion:[''],
      provincia:[0]
    })
  }

  ngOnInit(): void {
    this.obtenerLocalidades();
    this.obtenerProvincias();
  }

  obtenerLocalidades()
  {
    this.localidadesServ.getLocalidades().subscribe(
      resultado => this.listLocalidades = resultado,
      error => console.log(error),
    )
  }

  guardarLocalidad()
  {

    if (this.formLocalidad.value.id_localidad) {
      this.localidadesServ.updateLocalidad(this.formLocalidad.value).subscribe(
        respuesta => {
          console.log(respuesta);
          this.obtenerLocalidades();
          this.formLocalidad.reset();
          this.text_button = 'Guardar';
          this.class_button_sa = 'btn btn-success btn-sm';
          this.class_display = 'display:none';
        },
        error => console.log(error)
      )
    } 
    else {
      this.localidadesServ.saveLocalidad(this.formLocalidad.value).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerLocalidades();
          this.formLocalidad.reset();
          this.formLocalidad.get('provincia').setValue(0);
        },
        error => console.log(error)
      )
    }
    
  }

  editarLocalidad(localidad:ILocalidad)
  {
    this.text_button = 'Actualizar';
    this.class_button_sa = 'btn btn-primary btn-sm';
    this.class_display = 'display:block';
    this.formLocalidad.setValue({
      id_localidad:localidad.id_localidad,
      descripcion:localidad.descripcion,
      provincia:localidad.provincia
    });
  }

  eliminarLocalidad(id:number)
  {
    if (confirm('¿Esta seguro que desea eliminar?')) {
      this.localidadesServ.deleteLocalidad(id).subscribe(
        respuesta => {
          console.log(respuesta);
          this.obtenerLocalidades;
        },
        error => console.log(error)
      )
    }
  }

  obtenerProvincias(){
    this.localidadesProvServ.getProvincias().subscribe(
      resultado => this.listLocProvincias = resultado
    )
  }

  resetearformLocalidad()
  {
    this.formLocalidad.reset();
    this.formLocalidad.get('provincia').setValue(0);
    this.text_button = 'Guardar';
    this.class_button_sa = 'btn btn-success btn-sm';
    this.class_display = 'display:none';
  }

}
