import { Request, Response, Router } from 'express';
import MySQL from '../mysql/mysql';
import Cliente from '../Class/Cliente';

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

//insertar cliente
clientesRoutes.post('/', (req: Request, res: Response) => {
    const cliente: Cliente = new Cliente(req.body.nombre, req.body.sexo, req.body.fechaIngreso);

    const query = `INSERT INTO clientes (Nombre,Sexo,fechaIngreso,codigo,estatus) VALUES ('${cliente.nombre}',${cliente.sexo},'${cliente.fechaIngreso}',${cliente.codigo},${cliente.estatus});`;
    MySQL.ejecutarQuery(query, (err: any, resp: any) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            cliente
        })

    });
});

//Actualizar Cliente por id
clientesRoutes.put('/', (req: Request, res: Response) => {
    const cliente: Cliente = new Cliente(req.body.nombre, req.body.sexo, req.body.fechaIngreso, req.body.id);
    const query = `UPDATE clientes
    SET nombre=?, sexo=?, fechaIngreso=?
    WHERE id=?`
    const consultaCompleta = MySQL.prepararQuery(query, [cliente.nombre, cliente.sexo, cliente.fechaIngreso, cliente.Id])
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
clientesRoutes.delete('/', (req: Request, res: Response) => {
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
export default clientesRoutes;