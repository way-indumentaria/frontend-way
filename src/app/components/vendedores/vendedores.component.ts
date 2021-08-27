import { Component, OnInit } from '@angular/core';
import { VendedoresService } from "../../services/vendedores.service";
import { FormBuilder , FormGroup } from "@angular/forms";
import { LocalidadesService } from "../../services/localidades.service";
import { ILocalidad } from 'src/app/models/localidad';
import { IVendedor } from 'src/app/models/vendedor';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {

  listVendedores = [];
  formVendedor: FormGroup;
  listVendedoresLoc = [];
  nomg: string="";
  apeg: string="";
  emailg: string="";
  dnig: number;
  domg: string="";
  telg: string="";

  class_button_sa:string = 'btn btn-success';
  text_button:string = 'Guardar';

  p:number = 1;
  buscar:any;

  constructor(private vendedoresServ:VendedoresService, private fb: FormBuilder, private vendedorLocServ:LocalidadesService ) {

    this.formVendedor = this.fb.group({
      
      // descripcion:['']
      id_vendedor:[null],
      nombre:[''],
      apellido:[''],
      dni:[''],
      domicilio:[''],
      email:[''],
      localidad:[-1],
      adjunto:[''],
      telefono:[''],
      nom_garante:[''],
      ape_garante:[''],
      email_garante:[''],
      dni_garante:[''],
      domicilio_garante:[''],
      telefono_garante:[''],
      estado:[1]

    })

   }

  ngOnInit(): void {
    this.obtenerVendedores();
    this.obtenerLocalidades();
  }


  obtenerVendedores(){
    this.vendedoresServ.getVendedores().subscribe(
      resultado => this.listVendedores = resultado,
      error => console.log(error)
    )
  }

  guardarVendedores(){
      if (this.formVendedor.value.id_vendedor){
      // si existe el id se actualiza
        this.vendedoresServ.updateVendedor(this.formVendedor.value).subscribe(
            respuesta => {
              console.log(respuesta);
              this.obtenerVendedores();
              this.formVendedor.reset();
              this.text_button = 'Guardar';
              this.class_button_sa = 'btn btn-success';
            },
            error => console.log(error)

        )


      }else{
        // si no existe lo guarda
        this.vendedoresServ.saveVendedores(this.formVendedor.value).subscribe(
          resultado => {
            console.log(resultado);
            this.obtenerVendedores();//se refresca la grilla
            this.formVendedor.reset();
            this.formVendedor.get('localidad').setValue(0);
          },
          error => console.log(error)
    
        )

      }




    

  }
  obtenerLocalidades(){
    this.vendedorLocServ.getLocalidades().subscribe(
      resultado => this.listVendedoresLoc = resultado
    )
  }

  editarVendedor(vendedor:IVendedor){
    this.text_button = 'Actualizar';
    this.class_button_sa = 'btn btn-primary';
     this.formVendedor.setValue({
      id_vendedor:vendedor.id_vendedor,
      nombre:vendedor.nombre,
      apellido:vendedor.apellido,
      dni:vendedor.dni,
      domicilio:vendedor.domicilio,
      email:vendedor.email,
      localidad:vendedor.id_localidad,
      adjunto:vendedor.adjunto,
      telefono:vendedor.telefono,
      nom_garante:vendedor.nom_garante,
      ape_garante:vendedor.ape_garante,
      dni_garante:vendedor.dni_garante,
      email_garante:vendedor.email_garante,
      domicilio_garante:vendedor.domicilio_garante,
      telefono_garante:vendedor.telefono_garante,
      estado:vendedor.estado,

     });
    // console.log(vendedor);
  }

  verDatosGarante(vendedor:IVendedor){

     this.nomg = vendedor.nom_garante;
     this.apeg = vendedor.ape_garante;
     this.emailg = vendedor.email_garante;
     this.dnig = vendedor.dni_garante;
     this.domg = vendedor.domicilio_garante;
     
     this.telg = vendedor.telefono_garante;
  }

  eliminarVendedor(id:number){

    if(confirm('¿Esta seguro que desea eliminar?')){

      this.vendedoresServ.deleteVendedor(id).subscribe(
        respuesta =>{
          console.log(respuesta);
          this.obtenerVendedores();
  
        },
        error => console.log(error)
        
      )
    }


    
  }

  resetearformVendedor(){
    this.formVendedor.reset();
    this.text_button = 'Guardar';
    this.class_button_sa = 'btn btn-success';
  }

}
