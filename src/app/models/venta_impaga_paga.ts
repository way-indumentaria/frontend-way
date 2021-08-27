export interface IVentaImpagaPaga
{
    id_impaga_paga?:number;
    fecha_carga:any;
    day?:number;
    month?:number;
    year?:number;
    vendedor:number;
    total:number;
    debe:number;
    estado:number;
    vendedor_descripcion:string;
}