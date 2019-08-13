"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Pagos_1 = require("../class/Pagos");
var Cliente_1 = __importDefault(require("../class/Cliente"));
var clientesRoutes = express_1.Router();
//obtener todo los clientes
clientesRoutes.get('/', function (req, res) {
    var query = "SELECT * FROM clientes";
    mysql_1.default.ejecutarQuery(query, function (err, resp) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        return res.json({
            ok: true,
            clientes: resp
        });
    });
});
//obtener todo los clientes
clientesRoutes.get('/lista', function (req, res) {
    var query = "SELECT \n    c.id,\n    c.nombre,\n    c.sexo,\n    c.fechaIngreso,\n    c.codigo,\n    c.estatus,\n    c.img,\n    p1.fecha AS ultimopago,\n    DATE_ADD(p1.fecha, INTERVAL 30 DAY) AS vencimiento \n  FROM\n    pagos p1 \n    INNER JOIN \n      (SELECT \n        id,\n        cliente,\n        MAX(id) ultimoid,\n        fecha\n      FROM\n        pagos \n      GROUP BY cliente) p2 \n      ON p1.cliente = p2.cliente \n      AND p1.id = p2.ultimoid \n    INNER JOIN clientes c \n      ON c.id = p2.cliente";
    mysql_1.default.ejecutarQuery(query, function (err, resp) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        return res.json({
            ok: true,
            clientes: resp
        });
    });
});
//informacion y factura del cliente por codigo
clientesRoutes.get('/codigo/:id', function (req, res) {
    var codigo = req.params.id || 0;
    var query = "SELECT \n    c.id,\n    c.nombre,\n    c.sexo,\n    c.fechaIngreso,\n    c.codigo,\n    c.estatus,\n    c.img,\n    p.fecha AS pago,\n    DATE_ADD(p.fecha, INTERVAL 30 DAY) AS vencimiento\n  FROM\n    clientes c \n    INNER JOIN pagos p \n      ON p.cliente = c.Id \n  WHERE c.codigo = " + codigo + " ";
    mysql_1.default.ejecutarQuery(query, function (err, resp) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        return res.json({
            ok: true,
            cliente: resp
        });
    });
});
//obtener un cliente por id
clientesRoutes.get('/unico/:id', function (req, res) {
    var id = req.params.id || 0;
    var query = "SELECT * FROM clientes where id =" + id;
    mysql_1.default.ejecutarQuery(query, function (err, resp) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        return res.json({
            ok: true,
            cliente: resp[0]
        });
    });
});
//insertar cliente
clientesRoutes.post('/', function (req, res) {
    var cliente = new Cliente_1.default(req.body.nombre, req.body.sexo, req.body.fechaIngreso);
    var query = "INSERT INTO clientes (nombre,Sexo,fechaIngreso,codigo,estatus) VALUES ('" + cliente.nombre + "'," + cliente.sexo + ",'" + cliente.fechaIngreso + "'," + cliente.codigo + "," + cliente.estatus + ");";
    mysql_1.default.ejecutarQuery(query, function (err, resp) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        Pagos_1.Pago.efectuarPagoMes(Number(resp.insertId));
        return res.json({
            ok: true,
            cliente: cliente
        });
    });
});
//Actualizar Cliente por id
clientesRoutes.put('/', function (req, res) {
    var cliente = new Cliente_1.default(req.body.nombre, req.body.sexo, req.body.fechaIngreso, req.body.Id);
    var query = "UPDATE clientes\n    SET nombre=?, sexo=?, fechaIngreso=?, estatus = ?\n    WHERE id=?";
    var consultaCompleta = mysql_1.default.prepararQuery(query, [cliente.nombre, cliente.sexo, cliente.fechaIngreso, cliente.estatus, cliente.Id]);
    console.log(consultaCompleta);
    mysql_1.default.ejecutarQuery(consultaCompleta, function (err, cliente) {
        if (err) {
            return res.json({
                ok: false,
                respuesta: err
            });
        }
        return res.json({
            ok: true,
            cliente: cliente
        });
    });
});
//Dar de baja cliente por id
clientesRoutes.delete('/temporal', function (req, res) {
    var id = req.query.id || 0;
    var cliente = new Cliente_1.default(req.body.nombre, req.body.sexo, req.body.fechaIngreso, req.body.id);
    var query = "UPDATE clientes\n    SET estatus=false\n    WHERE id=?";
    var consultaCompleta = mysql_1.default.prepararQuery(query, [id]);
    mysql_1.default.ejecutarQuery(consultaCompleta, function (err, cliente) {
        if (err) {
            return res.json({
                ok: false,
                respuesta: err
            });
        }
        return res.json({
            ok: true,
            cliente: cliente
        });
    });
});
//eliminar cliente 
//Dar de baja cliente por id
clientesRoutes.delete('/', function (req, res) {
    var id = req.query.id || 0;
    var query = "DELETE FROM clientes\n    WHERE id = ?";
    var consultaCompleta = mysql_1.default.prepararQuery(query, [id]);
    mysql_1.default.ejecutarQuery(consultaCompleta, function (err, cliente) {
        if (err) {
            return res.json({
                ok: false,
                respuesta: err
            });
        }
        return res.json({
            ok: true,
            cliente: cliente
        });
    });
});
clientesRoutes.get('/vencidos', function (req, res) {
    var consulta = "SELECT \n    c.id,\n    c.nombre,\n    c.sexo,\n    c.fechaIngreso,\n    c.codigo,\n    c.estatus,\n    c.img,\n    p1.fecha AS ultimopago,\n    DATE_ADD(p1.fecha, INTERVAL 30 DAY) AS vencimiento \n  FROM\n    pagos p1 \n    INNER JOIN \n      (SELECT \n        id,\n        cliente,\n        MAX(id) ultimoid,\n        fecha\n      FROM\n        pagos \n      GROUP BY cliente) p2 \n      ON p1.cliente = p2.cliente \n      AND p1.id = p2.ultimoid \n    INNER JOIN clientes c \n      ON c.id = p2.cliente \n     WHERE DATE(NOW()) >= DATE_ADD(p1.fecha, INTERVAL 30 DAY)";
    mysql_1.default.ejecutarQuery(consulta, function (err, respuesta) {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            });
        }
        return res.json({
            ok: true,
            clientes: respuesta
        });
    });
});
exports.default = clientesRoutes;
