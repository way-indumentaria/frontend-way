import { Component, OnInit } from '@angular/core';

import { VentasImpagasPagasService } from "../../services/ventas-impagas-pagas.service";
import { FormBuilder , FormGroup } from "@angular/forms";
import { IVentaImpagaPaga } from "src/app/models/venta_impaga_paga";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-ventas-impagas-pagas',
  templateUrl: './ventas-impagas-pagas.component.html',
  styleUrls: ['./ventas-impagas-pagas.component.css']
})
export class VentasImpagasPagasComponent implements OnInit {
  listVentaImpagaPaga = [];

  formVentaImpagaPaga: FormGroup;

  id_vpi:number=0;

  id_vendedor_params:number;

  nombre_ape_params:string;

  p:number = 1;
  buscar:any;

  constructor(private activatedRouter:ActivatedRoute,private router:Router, private ventaImpagaPagaServ: VentasImpagasPagasService, private fb: FormBuilder ) { 
    this.formVentaImpagaPaga = this.fb.group({
      id_impaga_paga:[''],
      fecha_carga:[''],
      vendedor:[''],
      total:[''],
      debe:[''],
      estado:['']
    });
   }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      params => {
        this.id_vendedor_params = params.id_vendedor
        this.nombre_ape_params = params.nombre_ape;
      }
    );
    this.obtenerVentaImpagaPaga(this.id_vendedor_params);
  }

  actualizar(datoDelPopup: string) {
    this.obtenerVentaImpagaPaga(this.id_vendedor_params);
 }



  verDetalle(idip:number)
  {
    this.id_vpi = idip;
  }

  verDetalle2(id_vpi:number)
  {
    this.router.navigate(['ventas-detalle',id_vpi]);
  }

  obtenerVentaImpagaPaga(id_vendedor:number){
    this.ventaImpagaPagaServ.getVentaImpagaPaga(id_vendedor).subscribe(

        resultado => this.listVentaImpagaPaga = resultado,
        error => console.log(error)
         
    )
  }

  guardarVentaImpagaPaga(){
    // console.log(this.formProvincia.value);
    if (this.formVentaImpagaPaga.value.id_impaga_paga){

         // si existe el id se actualiza
     this.ventaImpagaPagaServ.updateVentaImpagaPaga(this.formVentaImpagaPaga.value).subscribe(
      respuesta => {
        console.log(respuesta);
        this.obtenerVentaImpagaPaga(this.id_vendedor_params);
        this.formVentaImpagaPaga.reset();
      },
      error => console.log(error)
  )
    }else{
    
    this.ventaImpagaPagaServ.saveVentaImpagaPaga(this.formVentaImpagaPaga.value).subscribe(
      resultado => {
        console.log(resultado);
        this.obtenerVentaImpagaPaga(this.id_vendedor_params);//se refresca la grilla
        this.formVentaImpagaPaga.reset();
      },
      error => console.log(error)

    )
  }

 
}

editarVentaImpagaPaga(venta_impaga_paga:IVentaImpagaPaga){
  this.formVentaImpagaPaga.setValue({
    id_impaga_paga:venta_impaga_paga.id_impaga_paga,
    fecha_carga:{year:Number(venta_impaga_paga.year),month:Number(venta_impaga_paga.month),day:Number(venta_impaga_paga.day)},
    vendedor:venta_impaga_paga.vendedor_descripcion,
    total:venta_impaga_paga.total,
    debe:venta_impaga_paga.debe,
    estado:venta_impaga_paga.estado,

  });
  
   }

   eliminarVentaImpagaPaga(id:number){

    if(confirm('¿Esta seguro que desea eliminar?')){

      this.ventaImpagaPagaServ.deleteVentaImpagaPaga(id).subscribe(
        respuesta =>{
          console.log(respuesta);
          this.obtenerVentaImpagaPaga(this.id_vendedor_params);
  
        },
        error => console.log(error)
        
      )
    }


}

resetearformVentaImpagaPaga(){
  this.formVentaImpagaPaga.reset();
}}
