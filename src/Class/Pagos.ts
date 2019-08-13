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

    static efectuarPagoMes(idcliente: number) {
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

    setearFecha(fecha: string) {
        return dateformat(fecha, 'yyyy-mm-dd');
    }

    static async  efectuarPagoSumado(idcliente: number) {
        const consulta = `SELECT 
        * 
      FROM
        pagos 
      WHERE cliente = 1 
      ORDER BY id DESC 
      LIMIT ${idcliente} `
        MySQL.ejecutarQuery(consulta, (err: any, respuesta: any) => {
            let fechaPagoActual = String(respuesta[0].fecha);
            let date = new Date(fechaPagoActual)
            date = new Date(date.setMonth(date.getMonth() + 1));
            const fechaParseada = date.toISOString().slice(0, 10);
            const sql = MySQL.prepararQuery('INSERT INTO pagos(fecha,cliente) VALUES (?,?)', [fechaParseada, idcliente])
            MySQL.ejecutarQuery(sql, (err: any, respuesta: any) => {
                if (err) {
                    throw new Error('error al momento de inesrtar' + err)
                } else {
                    return respuesta;
                }
            })
        })
    }

    static async verificarPrimeraVez(idcliente: number) {
        const consulta = `SELECT * FROM pagos where cliente = ${idcliente}`
        MySQL.ejecutarQuery(consulta, (err: any, respuesta: any) => {
            if (err) {
                return true;
            } else {
                return false;
            }
        })
    }


}