import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { EstadisticasService } from "../../services/estadisticas.service";
interface IData {
  name:string,
  data:any[]
}
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  data:any;
  chart1:Chart;
  chart2:Chart;
  chart3:Chart;
  chart4:Chart;
  chart5:Chart;

  dataPie:any;

  fdesde:string;
  fhasta:string;

  total_impagas:string;
  total_pagas:string;
  total_gastos:string;

  rango:string;

  meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  constructor(private estadisticaServ:EstadisticasService) { }

  ngOnInit(): void {
    let date = new Date();
    let desde:string = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
    let hasta:string = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10);

    let fecha1_format = desde.split("-")[2] + ' ' + this.meses[Number(desde.split("-")[1])-1] + ' ' + desde.split("-")[0]
    let fecha2_format = hasta.split("-")[2] + ' ' + this.meses[Number(hasta.split("-")[1])-1] + ' ' + hasta.split("-")[0]

    this.rango = fecha1_format + '<span class="text-success"> a </span>' + fecha2_format;

    this.getDataLineVentasCantidadPorVendedor(desde,hasta);
    this.getDataLineVentasPorVendedor(desde,hasta);
    this.getDataLineVentasTotalesFecha(desde,hasta);
    this.getDataPieVentasPorProducto(desde,hasta);
    this.getImpagasPagasGastos(desde,hasta);
    //this.getDataLineVentasImpagasPagas('2021-01-01','2021-03-25');
  }

  
  iniciarGraficosPorFiltros()
  {
    let mes_split_desde:any = this.fdesde.split("-");
    let mes_split_hasta:any = this.fhasta.split("-");

    let fecha1_format = mes_split_desde[2] + ' ' + this.meses[mes_split_desde[1]-1] + ' ' + mes_split_desde[0]
    let fecha2_format = mes_split_hasta[2] + ' ' + this.meses[mes_split_hasta[1]-1] + ' ' + mes_split_hasta[0]

    this.rango = fecha1_format + '<span class="text-success"> a </span>' + fecha2_format;

    this.getDataLineVentasCantidadPorVendedor(this.fdesde,this.fhasta);
    this.getDataLineVentasPorVendedor(this.fdesde,this.fhasta);
    this.getDataLineVentasTotalesFecha(this.fdesde,this.fhasta);
    this.getDataPieVentasPorProducto(this.fdesde,this.fhasta);
    this.getImpagasPagasGastos(this.fdesde,this.fhasta);
    //this.getDataLineVentasImpagasPagas(this.fdesde,this.fhasta);
  }

  async getDataPieVentasPorProducto(fdesde:string,fhasta:string)
  {
    let data:any = null;
    await this.estadisticaServ.getVentasPorProducto(fdesde,fhasta).subscribe(
        resultado => {
          data = resultado;
          this.chart3 = this.init_pie(data);
        },
        error => console.log(error)
    )
  }

  /*async getDataLineVentasImpagasPagas(fdesde:string,fhasta:string)
  {
    let data:any = null;
    await this.estadisticaServ.getVentasIP(fdesde,fhasta).subscribe(
        resultado => {
          data = resultado;
          this.chart4 = this.init(data[0],data[1],'Ventas(p.costo) pagas e impagas','Ventas en [$]',"Ventas: <b>$ {point.y:,.2f}</b>");
        },
        error => console.log(error)
    )
  }*/

  async getImpagasPagasGastos(fdesde:string,fhasta:string)
  {
      await this.estadisticaServ.getImpagasPagasGastos(fdesde,fhasta).subscribe(
        resultado => {
          console.log(resultado)
            this.total_gastos = resultado[0].gastos;
            this.total_pagas = resultado[0].pagas;
            this.total_impagas = resultado[0].impagas;
        },
        error => console.log(error)
    )
  }

  async getDataLineVentasTotalesFecha(fdesde:string,fhasta:string)
  {
    let data:any = null;
    await this.estadisticaServ.getVentasTotalesFecha(fdesde,fhasta).subscribe(
        resultado => {
          data = resultado;
          this.chart2 = this.init(data[0],data[1],'Ganancias en el tiempo','Totales en [$]',"VTAS TOTALES: <b>$ {point.y}</b>");
        },
        error => console.log(error)
    )
  }

  async getDataLineVentasCantidadPorVendedor(fdesde:string,fhasta:string)
  {
      await this.estadisticaServ.getVentasCantidadPorVendedor(fdesde,fhasta).subscribe(
        resultado => {
            this.data = resultado;
            this.chart5 = this.init(this.data[0],this.data[1],'Cantidad de Prendas por vendedor','Cantidad de prendas',"VDOR: <b>{series.name}</b> / CANT: <b>{point.y}</b>");
        }
      )
  } 

  async getDataLineVentasPorVendedor(fdesde:string,fhasta:string)
  {
      await this.estadisticaServ.getVentasPorVendedor(fdesde,fhasta).subscribe(
        resultado => {
            this.data = resultado;
            this.chart1 = this.init(this.data[0],this.data[1],'Ventas Pagas por vendedor','Ventas en [$]',"VDOR: <b>{series.name}</b> / VTAS: <b>${point.y}</b>");
        }
      )
  } 

  init(data:any,categorias:any,titulo:string,titulo_y:string,pointFormat:string)
  {

    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: titulo
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories:categorias,
      },
      yAxis: {
                title: {
                    text: titulo_y
                },
                plotLines: [{
                      value: 0,

                      width: 1,
                      color: '#808080'
                }], 

                labels: {
                    format: '{value:,1f}'
                },
                min:0
          },
          tooltip: {
                pointFormat: pointFormat
                //enabled:true
          },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
      series: data,
    });
    return chart;
  }
  


  init_pie(data:any)
  {
      let chart = new Chart({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Top 5 de Ventas Pagas por Producto'
        },
        tooltip: {
            pointFormat: '{point.name}: <b>${point.y}</b>'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                },
                showInLegend: true
            }
        },
        series: data
      })
      return chart;
  }

}
