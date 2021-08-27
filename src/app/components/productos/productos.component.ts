import { Component, OnInit } from '@angular/core';

import { ProductosService } from "../../services/productos.service";

import { FormBuilder, FormGroup } from "@angular/forms";

import { CategoriasService } from "../../services/categorias.service";

import { IProducto } from "../../models/producto";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listProductos = [];

  listCategoria = [];

  formProducto: FormGroup;

  class_button_sa:string = 'btn btn-outline-success';

  class_display:string = 'display:none';

  text_button:string = 'Guardar';

  p:number = 1;
  buscar:any;


  constructor(private productosServ:ProductosService, private fb: FormBuilder, private categoriasServ:CategoriasService) {

    this.formProducto = this.fb.group({

      id_producto:[null],
      codigo:[''],
      descripcion:[''],
      precio_compra:[''],
      precio_way:[''],
      precio_final:[''],
      categoria:[0],
      estado:[-1],
      descuento:[''],
      categoria_sexo:[1],
      fecha_carga:[new Date()],
      stock:[1]

    })

   }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategoria();
  }

  obtenerProductos()
  {
    this.productosServ.getProductos().subscribe(
      resultado => this.listProductos = resultado,
      error => console.log(error),
    )
  }

  guardarProducto()
  {
    if (this.formProducto.value.id_producto) 
    {
      this.productosServ.updateProducto(this.formProducto.value).subscribe(
        respuesta => {
          console.log(respuesta);
          this.obtenerProductos();
          this.formProducto.reset();
          this.text_button = 'Guardar';
          this.class_button_sa = 'btn btn-outline-success';
          this.class_display = 'display:none';
        },
        error => console.log(error)
      )
    } 
    else 
    {
      this.productosServ.saveProducto(this.formProducto.value).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerProductos();//se refresca la grilla
          this.formProducto.reset();
          this.formProducto.get('categoria').setValue(0);
        },
        error => console.log(error)
      )
    }

  }

  editarProducto(producto:IProducto)
  {
    this.text_button = 'Actualizar';
    this.class_button_sa = 'btn btn-outline-primary';
    this.class_display = 'display:block';
    this.formProducto.setValue({
      id_producto:producto.id_producto,
      codigo:producto.codigo,
      descripcion:producto.descripcion,
      precio_compra:producto.precio_compra,
      precio_way:producto.precio_way,
      precio_final:producto.precio_final,
      categoria:producto.categoria,
      estado:producto.estado,
      descuento:producto.descuento,
      categoria_sexo:producto.categoria_sexo,
      fecha_carga:{year:Number(producto.year),month:Number(producto.month),day:Number(producto.day)},
      stock:producto.stock
    });
  }

  eliminarProducto(id:number)
  {
    if (confirm('¿Esta seguro que quiere eliminar?')) {
      this.productosServ.deleteProducto(id).subscribe(
        respuesta => {
          console.log(respuesta);
          this.obtenerProductos();
        },
        error => console.log(error)
      )
    }
  }

  obtenerCategoria()
  {
    this.categoriasServ.getCategoria().subscribe(
      resultado => this.listCategoria = resultado
    )
  }

  resetearformProducto()
  {
    this.formProducto.reset();
    this.text_button = 'Guardar';
    this.class_button_sa = 'btn btn-outline-success';
    this.class_display = 'display:none';
  }

}
