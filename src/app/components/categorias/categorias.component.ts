import { Component, OnInit } from '@angular/core';

import { CategoriasService } from "../../services/categorias.service";
import { FormBuilder , FormGroup } from "@angular/forms";
import { ICategoria } from "src/app/models/categoria";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  listCategoria = [];

  formCategoria: FormGroup;

  class_button_sa:string = 'btn btn-success btn-sm';

  class_display:string = 'display:none';

  text_button:string = 'Guardar';

  p:number = 1;
  buscar:any;

  constructor( private categoriaServ: CategoriasService, private fb: FormBuilder ) { 

    this.formCategoria = this.fb.group({
      id_categoria:[null],
      descripcion:[''],
      estado:[1]
    })
   }

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  obtenerCategoria(){
    this.categoriaServ.getCategoria().subscribe(

        resultado => this.listCategoria = resultado,
        error => console.log(error)
         
    )
  }

  guardarCategoria(){
    // console.log(this.formProvincia.value);
    if (this.formCategoria.value.id_categoria){

         // si existe el id se actualiza
     this.categoriaServ.updateCategoria(this.formCategoria.value).subscribe(
      respuesta => {
        console.log(respuesta);
        this.obtenerCategoria();
        this.formCategoria.reset();
        this.text_button = 'Guardar';
        this.class_button_sa = 'btn btn-success btn-sm';
        this.class_display = 'display:none';
      },
      error => console.log(error)
  )
    }else{
    
    this.categoriaServ.saveCategoria(this.formCategoria.value).subscribe(
      resultado => {
        console.log(resultado);
        this.obtenerCategoria();//se refresca la grilla
        this.formCategoria.reset();
      },
      error => console.log(error)

    )
  }

  }

  editarCategoria(categoria:ICategoria){

    this.text_button = 'Actualizar';
    this.class_button_sa = 'btn btn-primary btn-sm';
    this.class_display = 'display:block';
    this.formCategoria.setValue({
      id_categoria:categoria.id_categoria,
      descripcion:categoria.descripcion,
      estado:categoria.estado,

    });
  }

     eliminarCategoria(id:number){

      if(confirm('¿Esta seguro que desea eliminar?')){
  
        this.categoriaServ.deleteCategoria(id).subscribe(
          respuesta =>{
            console.log(respuesta);
            this.obtenerCategoria();
    
          },
          error => console.log(error)
          
        )
      }
  
  
      
    }

  



     resetearformCategoria(){
      this.formCategoria.reset();
      this.formCategoria.get('estado').setValue(1);
      this.text_button = 'Guardar';
      this.class_button_sa = 'btn btn-success btn-sm';
      this.class_display = 'display:none';
    }


}
