import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaGastosComponent } from "./components/categoria-gastos/categoria-gastos.component";
import { CategoriasComponent } from "./components/categorias/categorias.component";
import { GastosComponent } from "./components/gastos/gastos.component";
import { LocalidadesComponent } from "./components/localidades/localidades.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { ProvinciasComponent } from "./components/provincias/provincias.component";
import { VentasComponent } from "./components/ventas/ventas.component";
import { VentaDetalleComponent } from "./components/venta-detalle/venta-detalle.component";
import { VendedoresComponent } from "./components/vendedores/vendedores.component";
import { VentasImpagasPagasComponent } from "./components/ventas-impagas-pagas/ventas-impagas-pagas.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { IngresoComponent } from "./components/ingreso/ingreso.component";
import { AuthGuard } from "./auth.guard";


const routes: Routes = [
  {
    path:"categoriaGastos",component:CategoriaGastosComponent
  },
  {
    path:"categorias",component:CategoriasComponent
  },
  {
    path:"gastos",component:GastosComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"localidades",component:LocalidadesComponent
  },
  {
    path:"productos",component:ProductosComponent
  },
  {
    path:"provincias",component:ProvinciasComponent
  },
  {
    path:"vendedores",component:VendedoresComponent
  },
  {
    path:"ventas",component:VentasComponent
  },
  {
    path:"ventas-seguimiento/:id_vendedor/:nombre_ape",component:VentasImpagasPagasComponent
  },
  {
    path:"ventas-detalle/:id_vpi",component:VentaDetalleComponent
  },
  {
    path:"registro",component:RegistroComponent
  },
  {
    path:"ingreso",component:IngresoComponent
  },
  {
    path:'', redirectTo:'/ingreso', pathMatch:'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
