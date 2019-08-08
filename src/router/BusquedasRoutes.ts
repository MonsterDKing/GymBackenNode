import { Request, Response, Router } from 'express';
import MySQL from '../mysql/mysql';
import Cliente from '../Class/Cliente';

const busquedasRoutes = Router();

//Buscar cliente por codigo 
busquedasRoutes.get('/', (req: Request, res: Response) => {

    const codigo = req.query.codigo || 0;
    const id = req.query.id || 0;
    const nombre = req.query.nombre || '';

    if (codigo != 0) {
        const query = "SELECT * from clientes where codigo = ?"
        const sql = MySQL.prepararQuery(query, [codigo])
        MySQL.ejecutarQuery(sql, (err: any, cliente: Cliente) => {
            if (err) {
                return res.json({
                    ok: false,
                    respuesta: err
                });
            }
            return res.json({
                ok: true,
                cliente
            })
        });
    }
    if (id != 0) {
        console.log('entro')
        const query = "SELECT * from clientes where id = ?"
        const sql = MySQL.prepararQuery(query, [id])
        MySQL.ejecutarQuery(sql, (err: any, cliente: Cliente) => {
            if (err) {
                return res.json({
                    ok: false,
                    respuesta: err
                });
            }
            return res.json({
                ok: true,
                cliente
            })
        });
    }

    if (nombre != '') {
        const query = `SELECT * from clientes where nombre LIKE '%${nombre}%' `
        // const sql = MySQL.prepararQuery(query, [nombre])
        MySQL.ejecutarQuery(query, (err: any, cliente: Cliente) => {
            if (err) {
                return res.json({
                    ok: false,
                    respuesta: err
                });
            }
            return res.json({
                ok: true,
                cliente
            })
        });
    }

});



export default busquedasRoutes;