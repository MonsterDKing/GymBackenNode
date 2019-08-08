import MySQL from "../mysql/mysql";
import dateformat from 'dateformat';
export class Pago {
    id: number;
    fecha: string;
    cliente: number;

    constructor(id: number, fecha: string, cliente: number) {
        this.id = id;
        this.fecha = fecha;
        this.cliente = cliente
    }

    static  efectuarPagoMes(idcliente: number)  {
        return new Promise((resolve, reject) => {
            const fechaHoy = new Date();
            const fechaParseada = fechaHoy.toISOString().slice(0, 10);
            const sql = MySQL.prepararQuery('INSERT INTO pagos(fecha,cliente) VALUES (?,?)', [fechaParseada, idcliente])
            MySQL.ejecutarQuery(sql, (err: any, respuesta: any) => {
                if (err) {
                    reject(err)
                }
                resolve(respuesta)
            })
        })
    }

     setearFecha(fecha:string){
        return dateformat(fecha,'yyyy-mm-dd');
    }


}