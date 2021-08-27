import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren, Inject } from '@angular/core';

import { VentasService } from "../../services/ventas.service";

import { FormBuilder, FormGroup } from "@angular/forms";

import { VendedoresService } from "../../services/vendedores.service";

import { VentasImpagasPagasService } from "../../services/ventas-impagas-pagas.service";

import { ProductosService } from "../../services/productos.service";

import { IVenta } from "../../models/venta";

import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable} from 'pdfmake-wrapper/lib/interfaces';
declare var $: any;
type TableRow = [number,string,string,number,string,string,/*string,*/string,string,string];
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  

  listVentas = [];

  listProVentas = [];

  listImpPagVentas = [];

  listVendVentas = [];

  formVenta: FormGroup;

  activePillIndex:number = 0;

  buscarVenta:any;

  display_venta:string = 'display:none';

  idVendedor:number;

  nombre_ape:string;

  p:number = 1;
  buscar:any;

  toastclass:string = '';
  toastmensaje:string = '';

  total_pagas:number = 0;
  total_impagas:number = 0;

  datos_totales:any;

  cantidad_vendedores:number = 0;

  cantidad_prendas:number = 0;
  cantidad_totales:string = '';
  cantidad_costo:string = '';

  cantidad_prendas2:number = 0;

  @ViewChildren('inputs_i') inputs_i: QueryList<ElementRef>;
  @ViewChildren('inputs_d') inputs_d: QueryList<ElementRef>;

  constructor(private router:Router,private ventasServ:VentasService, private fb: FormBuilder, private ventasProServ:ProductosService, private ventasImpPagServ:VentasImpagasPagasService, private ventasVendServ:VendedoresService) {

    this.formVenta = this.fb.group({
      
      id_venta:[null],
      producto:[null],
      //cantidad:[''],
      //importe:[''],
      //fecha_venta:[''],
      //importe_unitario:[''],
      estado:[''],
      forma_pago:[-1],
      descuento_aplicado:[''],
      //planilla:[0],
      vendedor:[null],
      cantidad:[1]

    });

   }

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerProductos();
    //this.obtenerVentasImpPag();
    this.obtenerVendedores();
    this.cantidadProductosPorVendedor();
  }


  cantidadProductosPorVendedor()
  {
    this.cantidad_prendas2 = 0;
    let lvv:IVenta[] = this.listVentas.filter((v:IVenta)=> { return v.vendedor_venta == this.idVendedor} );
    lvv.forEach(elemento => {
      this.cantidad_prendas2 = this.cantidad_prendas2 + elemento.cantidad;

  });
  }

  /**
   * Configuracion de PDF
  */
  generatePdf()
  {
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    //pdf.pageMargins([ 40, 60, 40, 60 ]);
    pdf.header(
      new Txt('WAY INDUMENTARIA').alignment('center').fontSize(8).margin([20,15,20,15]).end,
    )
    let date = new Date();
    let fecha_actual = date.toLocaleDateString('es-AR');
    pdf.add(
      [
        new Txt('PLANILLA DE VENTA').bold().fontSize(13).margin([0,10]).end,

        new Txt(
        'El día de la fecha '+ fecha_actual +' él/la minorista '+this.nombre_ape+' se responsabiliza por la serie de productos descriptos a continuación: '
        ).bold().fontSize(10).margin([0,15]).end
      ]
    );

    let lvv:IVenta[] = this.listVentas.filter((v:IVenta)=> { return v.vendedor_venta == this.idVendedor} );
    pdf.add(this.createTable(lvv));

    pdf.create().open();
  }
  createTable(data:IVenta[]):ITable
  {
     this.cantidad_prendas = 0;
     this.cantidad_costo = null;
     this.cantidad_totales = null;
    data.forEach(elemento => {
        this.cantidad_prendas = this.cantidad_prendas + elemento.cantidad;
        this.cantidad_costo = String(Number(this.cantidad_costo) + Number(elemento.precio_costo));
        this.cantidad_totales = String(Number(this.cantidad_totales) + Number(elemento.importe));
    });
    return new Table([
        ['N°','Cod.Prod.','Producto','Cantidad','Costo($)','Importe unitario($)',/*'Total($)',*/'Fecha de venta','V',' D'],
        ...this.extractData(data),
        ['',{text: 'Totales', bold:true},'',{text: this.cantidad_prendas, bold:true},{text: '$'+this.cantidad_costo, bold:true},'',/*'',*/'','','']
    ])
    .layout({
        fillColor: (rowIndex:number,node:any, columnIndex:number):any => {
            return rowIndex === 0 ? '#ccc' : '';
        }
    }).
    fontSize(10)
    .end
  }

  extractData(data:IVenta[]):TableRow[] {
    return data.map((row,index) => [index+1,row.codigo_producto,row.producto_descripcion,row.cantidad,row.precio_costo,row.importe_unitario,/*row.importe,*/row.fecha_venta_formateada,' ',' '])
  }
  /** Finalizacion de configuracion de PDF */



  verSeguimiento(id_vendedor:number,nombre_ape:string)
  {
    this.router.navigate(['/ventas-seguimiento',id_vendedor,nombre_ape]);
  }

  obtenerVentas()
  {
    this.ventasServ.getVentas().subscribe(
      resultado => {
        this.listVentas = resultado;
        this.cantidadProductosPorVendedor();
      },
      error => console.log(error),
    )
  }


  guardarVentaPorLector(codigo_producto)
  {

    
    this.ventasServ.saveVentaByLector(this.formVenta.value).subscribe(
      resultado => {
        if(resultado == "1"){
         
          this.toastclass = 'toast bg-success text-white';
          this.toastmensaje = 'Se insertó exitosamente!';
          $('#toast-generic').toast({ 
              animation: true, 
              delay: 3000 
          }); 

          $('#toast-generic').toast('show');

          this.obtenerVentas();

          this.formVenta.get('producto').setValue(null);
          //this.formVenta.get('descuento').setValue(0);
          this.formVenta.get('forma_pago').setValue(-1);

          this.total_impagas = 0;

        }else{

          if(resultado == "2")
          {
            this.toastclass = 'toast bg-danger text-white';
            this.toastmensaje = 'No hay stock de este producto!';
            $('#toast-generic').toast({ 
                animation: true, 
                delay: 3000 
            }); 
            $('#toast-generic').toast('show');

          }else{

            this.toastclass = 'toast bg-danger text-white';
            this.toastmensaje = 'Error al insertar. Verifique si existe el producto!';
            $('#toast-generic').toast({ 
                animation: true, 
                delay: 3000 
            }); 
            $('#toast-generic').toast('show');

          }

        }
        
      },
      error => console.log(error)
    )
  }


  obtenerProductos()
  {
    this.ventasProServ.getProductos().subscribe(
      resultado => this.listProVentas = resultado,
      error => console.log(error),
    )
  }

  /*obtenerVentasImpPag() 
  {
    this.ventasImpPagServ.getVentaImpagaPaga().subscribe(
      resultado => this.listImpPagVentas = resultado,
      error => console.log(error),
    )
  }*/

  obtenerVendedores()
  {
    this.ventasVendServ.getVendedores().subscribe(
      resultado => {

        let result =  resultado.filter(function(vendedor) {
          return vendedor.estado == 1;
        });

        this.listVendVentas = result;
        this.formVenta.get('vendedor').setValue(this.listVendVentas[0].id_vendedor);
        this.idVendedor = this.listVendVentas[0].id_vendedor;
        this.nombre_ape = this.listVendVentas[0].nombre.toUpperCase()+', '+this.listVendVentas[0].apellido.toUpperCase();
        this.buscarVenta= 'v_'+this.listVendVentas[0].id_vendedor;

        this.obtenerTotalPagaImpaga(this.listVendVentas[0].id_vendedor);

        this.cantidad_vendedores = this.listVendVentas.length;

        this.cantidadProductosPorVendedor();
        

      },
      error => console.log(error)
    )
  }

  resetearformVenta()
  {
    this.formVenta.reset();
  }

  eliminarVenta(id:number){

    if(confirm('¿Esta seguro que desea eliminar?')){

      this.ventasServ.deleteVenta(id).subscribe(
        respuesta =>{
          if(respuesta == "1")
          {
            this.obtenerVentas();
            $('#toast-info').toast({ 
                animation: true, 
                delay: 3000 
            }); 
            $('#toast-info').toast('show');
          }else{
            $('#toast-info').toast({ 
                animation: true, 
                delay: 3000 
            }); 
            $('#toast-info').toast('show');
          }
  
        },
        error => console.log(error)
        
      )
    }


}
editarVenta(venta:IVenta){
    this.formVenta.setValue({
      id_venta:venta.id_venta,
      fecha_venta:{year:Number(venta.year),month:Number(venta.month),day:Number(venta.day)},
      producto:venta.producto,
      importe:venta.importe,
      cantidad:venta.cantidad,
      importe_unitario:venta.importe_unitario,
      estado:venta.estado,
      forma_pago:venta.forma_pago,
      descuento_aplicado:venta.descuento_aplicado,
      planilla:venta.planilla,
      vendedor:venta.vendedor_venta,
    });
}
  


   public selectPill(index:number,id_vendedor:number,nombre:string,apellido:string) {
     this.activePillIndex = index;
     this.buscarVenta = 'v_'+id_vendedor;
     this.formVenta.get('vendedor').setValue(id_vendedor);
     this.idVendedor = id_vendedor;
     this.nombre_ape = nombre.toUpperCase()+', '+apellido.toUpperCase();

     this.obtenerTotalPagaImpaga(id_vendedor);
     this.cantidadProductosPorVendedor();
   }


   incrementar(id_venta:number,estado:string,estado_contrario:string,cantidad:number)
   {

      let id_contrario = estado_contrario+'_'+id_venta+'_input';
      let input_contrario =  Number((<HTMLInputElement>document.getElementById(id_contrario)).value);
  
      let id = estado+'_'+id_venta+'_input';

      let input =  Number((<HTMLInputElement>document.getElementById(id)).value) + 1;

      let total_input = Number(input_contrario) + Number(input);

      if(cantidad >= total_input){
        (<HTMLInputElement>document.getElementById(id)).value = String(input);
      }

      this.total_impagas = null;
      if(estado == 'i')
      {
        this.inputs_i.forEach((input: ElementRef) => {
        
          let objeto = {};
  
          let str = input.nativeElement.id;
          let id = str.slice(2);
          this.total_impagas += (Number((<HTMLInputElement>document.getElementById('i_'+id)).value))*Number((<HTMLInputElement>document.getElementById('i_'+id+'_precio_unitario')).value);
        
        });
      }
      
   }

   disminuir(id_venta:number,estado:string,estado_contrario:string,cantidad:number)
   {
      let id = estado+'_'+id_venta+'_input';
      if(  Number((<HTMLInputElement>document.getElementById(id)).value) > 0)
      {
        let input =  Number((<HTMLInputElement>document.getElementById(id)).value) - 1;
        (<HTMLInputElement>document.getElementById(id)).value = String(input);
      }

      this.total_impagas = null;
      if(estado == 'i')
      {
        this.inputs_i.forEach((input: ElementRef) => {
        
          let objeto = {};
  
          let str = input.nativeElement.id;
          let id = str.slice(2);
          this.total_impagas += (Number((<HTMLInputElement>document.getElementById('i_'+id)).value))*Number((<HTMLInputElement>document.getElementById('i_'+id+'_precio_unitario')).value);
        
        });
      }
   }

   getInputs() {

    const fd = new FormData(); 
    
    let array_impagas_devoluciones = [];
    
    this.inputs_i.forEach((input: ElementRef) => {
        let objeto = {};

        let str = input.nativeElement.id;
        objeto['id'] = str.slice(2);
        let id = str.slice(2);
        objeto['valor_impagas'] = Number((<HTMLInputElement>document.getElementById('i_'+id)).value);
        objeto['valor_devoluciones'] = Number((<HTMLInputElement>document.getElementById('d_'+id)).value);
        objeto['vendedor'] = Number(this.formVenta.get('vendedor').value);
        objeto['fecha_venta'] = (<HTMLInputElement>document.getElementById('i_'+id+'_fecha_venta')).value;
        objeto['producto'] = Number((<HTMLInputElement>document.getElementById('i_'+id+'_producto')).value);
        objeto['precio_unitario'] = (<HTMLInputElement>document.getElementById('i_'+id+'_precio_unitario')).value

        array_impagas_devoluciones.push(objeto);
    });

    this.ventasServ.sendToImpagaDevoluciones(array_impagas_devoluciones).subscribe(
      resultado => {
        this.toastclass = 'toast bg-success text-white';
          this.toastmensaje = 'Envío de productos exitoso!';
          $('#toast-generic').toast({ 
              animation: true, 
              delay: 3000 
          }); 

        $('#toast-generic').toast('show');
        this.obtenerVentas();
      },
      error => {
          console.log(error);
          this.toastclass = 'toast bg-danger text-white';
          this.toastmensaje = 'Error al enviar productos!';
          $('#toast-generic').toast({ 
              animation: true, 
              delay: 3000 
          }); 
          $('#toast-generic').toast('show');
      }
    );

    //console.log(JSON.parse(JSON.stringify(array_impagas_devoluciones)));

  }

  devolverStock(id:number)
  {
    this.ventasServ.sendStock(id).subscribe(
      resultado => {
          console.log(resultado);
          this.obtenerVentas();
      },
      error => console.log(error)
    );
  }

  obtenerTotalPagaImpaga(id_vendedor:number)
  {

    this.ventasServ.getTotalPagasImpagas(id_vendedor).subscribe(
      resultado => {
        /*this.datos_totales = resultado;
        this.total_impagas = this.datos_totales.total_impagas;
        this.total_pagas = this.datos_totales.total_pagas;*/
      },
      error => console.log(error)
    );
  }

  inc()
  {
    this.formVenta.get('cantidad').setValue(this.formVenta.get('cantidad').value +1);
  }

  dis()
  {
    if(this.formVenta.get('cantidad').value >1)
    {
      this.formVenta.get('cantidad').setValue(this.formVenta.get('cantidad').value -1);
    }
  }
  
}
