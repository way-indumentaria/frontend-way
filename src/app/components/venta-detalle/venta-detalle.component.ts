import { Component, OnInit, Input, Output ,ViewChild, EventEmitter} from '@angular/core';
import { VentasService } from "../../services/ventas.service";
import { IVentaDetalle } from 'src/app/models/venta_detalle';
import { ActivatedRoute } from '@angular/router';
import { VentasImpagasPagasComponent } from '../ventas-impagas-pagas/ventas-impagas-pagas.component';

declare var $: any;
@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  @Input() id_vpi:number;
  @Input('vendedor') vendedor:number;

  @Output() private textoEmitido = new EventEmitter<string>();

  @ViewChild('ventapi') ventaPagaImpaga: VentasImpagasPagasComponent;

  lista_impagas:IVentaDetalle[] = [];
  lista_pagas:IVentaDetalle[] = [];

  setChecked =false;

  disabled:boolean = true;


  display_buttons_impagas:boolean = true;
  display_buttons_pagas:boolean = true;

  display0:string = 'display:none';
  display1:string = 'display:none';

  input_id_venta_detalle:number = null;
  input_id_producto:number = null;

  radio_impagas_pagas:number = null;

  p1:number = 1;
  buscar1:any;

  p2:number = 1;
  buscar2:any;

  total_pagas:number = 0;
  total_impagas:number = 0;

  datos_totales:any;

  /*paginate:{itemsPerPage:15,currentPage:p}*/

  constructor(private activatedRouter:ActivatedRoute,private ventaServ:VentasService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      params => {
        //this.id_vpi = params.id_vpi;
       // this.obtenerVentasPagas(this.id_vpi);
        //this.obtenerVentasImpagas(this.id_vpi);
      }
    );

  }

  ngOnChanges() {
    console.log(this.id_vpi);
    this.obtenerVentasPagas(this.id_vpi);
    this.obtenerVentasImpagas(this.id_vpi);
    this.obtenerTotalPagaImpaga();
  }

  confirmarVenta(id:number)
  {
    if($('#'+id).is(":checked")){
      this.ventaServ.confirmVenta(id,1).subscribe(
        resultado => {
          console.log('exitoso');
        },
        error => console.log(error)
      );
    }else{
      this.ventaServ.confirmVenta(id,0).subscribe(
        resultado => {
          console.log('exitoso');
        },
        error => console.log(error)
      );
    }

  }

  obtenerVentasPagas(id_vip:number)
  {
    this.ventaServ.getPagas(id_vip,1).subscribe(
      resultado => {
        this.lista_pagas = resultado;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerVentasImpagas(id_vip:number)
  {
    this.ventaServ.getImpagas(id_vip,0).subscribe(
      resultado => {
        this.lista_impagas = resultado;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectedRow(id_venta_detalle:number,id_producto:number,estado_radio:number)
  {

    /*if(this.radio_impagas_pagas != estado_radio){
       if(estado_radio == 1)
       {
        this.obtenerVentasImpagas(this.id_vpi);
       }else{
        this.obtenerVentasPagas(this.id_vpi);
       }

       this.radio_impagas_pagas = estado_radio;
    }*/

    if(estado_radio == 1)
    {
      this.display_buttons_impagas = false;
      this.display_buttons_pagas = true;
      this.disabled = true;

    }else{
      this.display_buttons_impagas = true;
      this.display_buttons_pagas = false;
      this.disabled = false;
    }

    this.input_id_venta_detalle = id_venta_detalle;
    this.input_id_producto = id_producto;
  }


  enviarImpagasPagas(estado_radio:number)
  {
    this.ventaServ.sendPagasImpagas(this.input_id_venta_detalle,this.input_id_producto,estado_radio).subscribe(
      resultado => {

        if(resultado == "1")
        {
         this.obtenerVentasImpagas(this.id_vpi);
         this.obtenerVentasPagas(this.id_vpi);

         this.obtenerTotalPagaImpaga();

         let id = '#imp_'+this.input_id_venta_detalle;
         setTimeout(function(){
            $(id).attr('checked', true);
          },100);
          
        }else{
          alert('debe ser mayor a 1');
        }
        
      },
      error => console.log(error)
    );
   
  }



  enviarStockVenta(tipo_movimiento:number)
  {
    console.log('vendedor:'+this.vendedor);
    this.ventaServ.sendStockVenta(this.input_id_venta_detalle,this.input_id_producto,tipo_movimiento,this.vendedor).subscribe(
      resultado => {

        if(resultado == "1")
        {
         this.obtenerVentasImpagas(this.id_vpi);
         this.obtenerVentasPagas(this.id_vpi);

         this.textoEmitido.emit('actualizando');

         //this.cerrarModal();

         let id = '#imp_'+this.input_id_venta_detalle;
         setTimeout(function(){
            $(id).attr('checked', true);
          },100);
          
        }else{
          alert('debe ser mayor a 1');
        }
        
      },
      error => console.log(error)
    );
  }


  apagarBoton(estado:number)
  {
    if(estado == 0)
    {
      this.display0 = 'display:block';
      this.display1 = 'display:none';
    }else{
      this.display0 = 'display:none';
      this.display1 = 'display:block';
    }
  }


  cerrarModal()
  {
    $('#myModalEnviar').modal('toggle');
  }

  obtenerTotalPagaImpaga()
  {

    this.ventaServ.getTotalPagasImpagas(this.vendedor).subscribe(
      resultado => {
        this.datos_totales = resultado;
        this.total_impagas = this.datos_totales.total_impagas;
        this.total_pagas = this.datos_totales.total_pagas;
      },
      error => console.log(error)
    );
  }
}
