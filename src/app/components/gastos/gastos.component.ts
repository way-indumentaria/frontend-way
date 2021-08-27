import { Component, OnInit } from '@angular/core';

import { GastosService } from "../../services/gastos.service";

import { FormBuilder , FormGroup } from "@angular/forms";

import { CategoriaGastosService } from "../../services/categoria-gastos.service";
import { IGasto } from 'src/app/models/gasto';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  listGastos = [];

  listCatGastos = [];

  formGasto: FormGroup;

  class_button_sa:string = 'btn btn-success btn-sm';

  class_display:string = 'display:none';

  text_button:string = 'Guardar';

  p:number = 1;
  buscar:any;

  constructor(private gastosServ:GastosService, private fb: FormBuilder, private gastosCatServ:CategoriaGastosService) {
    
    this.formGasto = this.fb.group({
      id_gasto:[null],
      descripcion:[''],
      importe:[''],
      categoria:[0]
    })
   }
//se ejecuta cuando arranca el componente
  ngOnInit(): void {
    this.obtenerGastos();
    this.obtenerCategoriaGastos();
  }

  obtenerGastos()
  {
    this.gastosServ.getGastos().subscribe(
      resultado => this.listGastos = resultado,
      error => console.log(error),
    )
  }

  guardarGasto()
  {
    
    if(this.formGasto.value.id_gasto)
    {
      this.gastosServ.updateGasto(this.formGasto.value).subscribe(
        respuesta => {
          console.log(respuesta);
          this.obtenerGastos();
          this.formGasto.reset();
          this.text_button = 'Guardar';
          this.class_button_sa = 'btn btn-success btn-sm';
          this.class_display = 'display:none';
        },
        error => console.log(error)
      )
    }

    else
    {
      this.gastosServ.saveGasto(this.formGasto.value).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerGastos();//se refresca la grilla
          this.formGasto.reset();
          this.formGasto.get('categoria').setValue(0);
        },
        error => console.log(error)
  
      )
    }

  }

  obtenerCategoriaGastos(){
    this.gastosCatServ.getcatGastos().subscribe(
      resultado => this.listCatGastos = resultado
    )
  }

  editarGasto(gasto:IGasto){
    this.text_button = 'Actualizar';
    this.class_button_sa = 'btn btn-primary btn-sm';
    this.class_display = 'display:block';
    this.formGasto.setValue({
      id_gasto:gasto.id_gasto,
      descripcion:gasto.descripcion,
      importe:gasto.importe,
      categoria:gasto.categoria,
    });
  }

  eliminarGasto(id:number){
    if (confirm('¿Esta seguro que desea eliminar?')) {
      this.gastosServ.deleteGasto(id).subscribe(
        respuesta =>{
          console.log(respuesta);
          this.obtenerGastos();
        },
        error => console.log(error)
        
      )
    }
  }

  resetearformGasto(){
    this.text_button = 'Guardar';
    this.class_button_sa = 'btn btn-success btn-sm';
    this.class_display = 'display:none';
    
    this.formGasto.reset();
    this.formGasto.get('categoria').setValue(0);
  }
}
