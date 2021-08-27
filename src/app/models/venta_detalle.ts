export interface IVentaDetalle {
    id_venta_detalle?:number;
    id_venta_paga_impaga:number;
    producto:number;
    descripcion_producto:string;
    cantidad:number;
    precio_final:string;
    importe:string;
    estado_:number;
    estado_confirmacion:number;
    fecha_venta:Date;
}