import { Request, Response, Router } from 'express';
import MySQL from '../mysql/mysql';

const entradasRoutes = Router();


//obtener entradas del dia
entradasRoutes.get('/dia', (req: Request, res: Response) => {
    const date = new Date();
    const fechaParseada = date.toISOString().slice(0, 10);
    const consulta = `SELECT 
    c.nombre,
    c.Sexo,
    e.fechayhora,
    c.codigo,
    c.fechaIngreso 
  FROM
    entradas e 
    INNER JOIN clientes c 
      ON c.Id = e.clienteid 
  WHERE DATE(fechayhora) = ? `
    const sql = MySQL.prepararQuery(consulta, [fechaParseada])
    console.log(sql);
    MySQL.ejecutarQuery(sql, (err: any, resultados: any) => {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            })
        }
        return res.json({
            ok: true,
            clientes: resultados
        })
    });
});

//insertar entrada del dia 
entradasRoutes.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const primeraConsulta = `SELECT * from clientes where codigo = ${body.codigo}`
    MySQL.ejecutarQuery(primeraConsulta, (err: any, resultado: any) => {
        if (err) {
            return res.json({
                ok: false,
                mensaje: 'Codigo de cliente no existe'
            })
        }
        /// AQUI YA ESTA TODO BIEN 
        const horayfecha = new Date().toLocaleString()
        const consulta = `INSERT INTO entradas (codigo,fechayhora,clienteid) VALUES(?,?,?)`
        const sql = MySQL.prepararQuery(consulta, [resultado[0].codigo, horayfecha, resultado[0].Id])
        MySQL.ejecutarQuery(sql, (err: any, resultado: any) => {
            if (err) {
                res.json({
                    ok: false,
                    mensaje: 'No se encuentra el codigo disponible'
                })
            }
            return res.json({
                ok: true,
                mensaje: 'Entrada registrada Correctamente'
            });
        });
    });
});

export default entradasRoutes;