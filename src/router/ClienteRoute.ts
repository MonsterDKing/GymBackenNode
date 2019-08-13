import { Request, Response, Router } from 'express';
import MySQL from '../mysql/mysql';
import Cliente from '../class/Cliente';
import { Pago } from '../class/Pagos';

const clientesRoutes = Router();


//obtener todo los clientes
clientesRoutes.get('/', (req: Request, res: Response) => {
    const query = "SELECT * FROM clientes";
    MySQL.ejecutarQuery(query, (err: any, resp: any) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            clientes: resp
        })
    });
});

//obtener todo los clientes
clientesRoutes.get('/lista', (req: Request, res: Response) => {
    const query = `SELECT 
    c.id,
    c.nombre,
    c.sexo,
    c.fechaIngreso,
    c.codigo,
    c.estatus,
    c.img,
    p1.fecha AS ultimopago,
    DATE_ADD(p1.fecha, INTERVAL 30 DAY) AS vencimiento 
  FROM
    pagos p1 
    INNER JOIN 
      (SELECT 
        id,
        cliente,
        MAX(id) ultimoid,
        fecha
      FROM
        pagos 
      GROUP BY cliente) p2 
      ON p1.cliente = p2.cliente 
      AND p1.id = p2.ultimoid 
    INNER JOIN clientes c 
      ON c.id = p2.cliente`;
    MySQL.ejecutarQuery(query, (err: any, resp: any) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            clientes: resp
        })
    });
});

//informacion y factura del cliente por codigo
clientesRoutes.get('/codigo/:id', (req: Request, res: Response) => {
    const codigo = req.params.id || 0;
    const query = `SELECT 
    c.id,
    c.nombre,
    c.sexo,
    c.fechaIngreso,
    c.codigo,
    c.estatus,
    c.img,
    p.fecha AS pago,
    DATE_ADD(p.fecha, INTERVAL 30 DAY) AS vencimiento
  FROM
    clientes c 
    INNER JOIN pagos p 
      ON p.cliente = c.Id 
  WHERE c.codigo = ${codigo} `
    MySQL.ejecutarQuery(query, (err: any, resp: any) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            cliente: resp
        })
    });
});

//obtener un cliente por id
clientesRoutes.get('/unico/:id', (req: Request, res: Response) => {
    const id = req.params.id || 0;
    const query = "SELECT * FROM clientes where id =" + id;
    MySQL.ejecutarQuery(query, (err: any, resp: any) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            cliente: resp[0]
        })
    });
});

//insertar cliente
clientesRoutes.post('/', (req: Request, res: Response) => {
    const cliente: Cliente = new Cliente(req.body.nombre, req.body.sexo, req.body.fechaIngreso);
    const query = `INSERT INTO clientes (nombre,Sexo,fechaIngreso,codigo,estatus) VALUES ('${cliente.nombre}',${cliente.sexo},'${cliente.fechaIngreso}',${cliente.codigo},${cliente.estatus});`;
    MySQL.ejecutarQuery(query, (err: any, resp: any) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        Pago.efectuarPagoMes(Number(resp.insertId));
        return res.json({
            ok: true,
            cliente
        })

    });
});

//Actualizar Cliente por id
clientesRoutes.put('/', (req: Request, res: Response) => {
    const cliente: Cliente = new Cliente(req.body.nombre, req.body.sexo, req.body.fechaIngreso, req.body.Id);
    const query = `UPDATE clientes
    SET nombre=?, sexo=?, fechaIngreso=?, estatus = ?
    WHERE id=?`
    const consultaCompleta = MySQL.prepararQuery(query, [cliente.nombre, cliente.sexo, cliente.fechaIngreso, cliente.estatus, cliente.Id])
    console.log(consultaCompleta);
    MySQL.ejecutarQuery(consultaCompleta, (err: any, cliente: any) => {
        if (err) {
            return res.json({
                ok: false,
                respuesta: err
            })
        }
        return res.json({
            ok: true,
            cliente
        });
    });
});



//Dar de baja cliente por id
clientesRoutes.delete('/temporal', (req: Request, res: Response) => {
    const id = req.query.id || 0;
    const cliente: Cliente = new Cliente(req.body.nombre, req.body.sexo, req.body.fechaIngreso, req.body.id);
    const query = `UPDATE clientes
    SET estatus=false
    WHERE id=?`
    const consultaCompleta = MySQL.prepararQuery(query, [id])
    MySQL.ejecutarQuery(consultaCompleta, (err: any, cliente: any) => {
        if (err) {
            return res.json({
                ok: false,
                respuesta: err
            })
        }

        return res.json({
            ok: true,
            cliente
        });
    });
});

//eliminar cliente 
//Dar de baja cliente por id
clientesRoutes.delete('/', (req: Request, res: Response) => {
    const id = req.query.id || 0;
    const query = `DELETE FROM clientes
    WHERE id = ?`
    const consultaCompleta = MySQL.prepararQuery(query, [id])
    MySQL.ejecutarQuery(consultaCompleta, (err: any, cliente: any) => {
        if (err) {
            return res.json({
                ok: false,
                respuesta: err
            })
        }

        return res.json({
            ok: true,
            cliente
        });
    });
});


clientesRoutes.get('/vencidos', (req: Request, res: Response) => {
    const consulta = `SELECT 
    c.id,
    c.nombre,
    c.sexo,
    c.fechaIngreso,
    c.codigo,
    c.estatus,
    c.img,
    p1.fecha AS ultimopago,
    DATE_ADD(p1.fecha, INTERVAL 30 DAY) AS vencimiento 
  FROM
    pagos p1 
    INNER JOIN 
      (SELECT 
        id,
        cliente,
        MAX(id) ultimoid,
        fecha
      FROM
        pagos 
      GROUP BY cliente) p2 
      ON p1.cliente = p2.cliente 
      AND p1.id = p2.ultimoid 
    INNER JOIN clientes c 
      ON c.id = p2.cliente 
     WHERE DATE(NOW()) >= DATE_ADD(p1.fecha, INTERVAL 30 DAY)`;
    MySQL.ejecutarQuery(consulta, (err: any, respuesta: any) => {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            })
        }
        return res.json({
            ok: true,
            clientes: respuesta
        })
    })

});




export default clientesRoutes;