import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";


const estadisticasRoutes = Router();


//clientes que entraron en el dia
estadisticasRoutes.get('/entradasDia', (req: Request, res: Response) => {
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
    MySQL.ejecutarQuery(sql, (err: any, consulta: any) => {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            })
        }
        return res.json({
            ok: true,
            clientes: consulta
        })
    })
})

//clientes que entraron en el mes
estadisticasRoutes.get('/entradasMes', (req: Request, res: Response) => {
    const date = new Date();
    const fechaBase1 = date.toISOString().slice(0, 7) + '-01';
    const fechaBase2 = date.toISOString().slice(0, 7) + '-30';;
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
  WHERE DATE(fechayhora) BETWEEN ? AND ? `
    const sql = MySQL.prepararQuery(consulta, [fechaBase1, fechaBase2])
    MySQL.ejecutarQuery(sql, (err: any, consulta: any) => {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            })
        }
        return res.json({
            ok: true,
            clientes: consulta
        })
    })

})

//clientes nuevos hoy
estadisticasRoutes.get('/clientesNHoy', (req: Request, res: Response) => {
    const date = new Date();
    const fechaParseada = date.toISOString().slice(0, 10);
    const consulta = `SELECT * FROM clientes c
    WHERE DATE(c.fechaIngreso) = ?
    GROUP BY c.Id `
    const sql = MySQL.prepararQuery(consulta, [fechaParseada])
    MySQL.ejecutarQuery(sql, (err: any, consulta: any) => {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            })
        }
        return res.json({
            ok: true,
            clientes: consulta
        })
    })

})

//clientes nuevos al mes
estadisticasRoutes.get('/clientesNMes', (req: Request, res: Response) => {
    const date = new Date();
    const fechaBase1 = date.toISOString().slice(0, 7) + '-01';
    const fechaBase2 = date.toISOString().slice(0, 7) + '-30';;
    const consulta = `SELECT * FROM clientes c
	WHERE DATE(c.fechaIngreso) BETWEEN ? AND ? 
	GROUP BY c.Id `
    const sql = MySQL.prepararQuery(consulta, [fechaBase1,fechaBase2])
    MySQL.ejecutarQuery(sql, (err: any, consulta: any) => {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            })
        }
        return res.json({
            ok: true,
            clientes: consulta
        })
    })

})

export default estadisticasRoutes;