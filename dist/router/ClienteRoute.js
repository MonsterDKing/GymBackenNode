"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Cliente_1 = __importDefault(require("../Class/Cliente"));
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
//insertar cliente
clientesRoutes.post('/', function (req, res) {
    var cliente = new Cliente_1.default(req.body.nombre, req.body.sexo, req.body.fechaIngreso);
    var query = "INSERT INTO clientes (Nombre,Sexo,fechaIngreso,codigo,estatus) VALUES ('" + cliente.nombre + "'," + cliente.sexo + ",'" + cliente.fechaIngreso + "'," + cliente.codigo + "," + cliente.estatus + ");";
    mysql_1.default.ejecutarQuery(query, function (err, resp) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        return res.json({
            ok: true,
            cliente: cliente
        });
    });
});
//Actualizar Cliente por id
clientesRoutes.put('/', function (req, res) {
    var cliente = new Cliente_1.default(req.body.nombre, req.body.sexo, req.body.fechaIngreso, req.body.id);
    var query = "UPDATE clientes\n    SET nombre=?, sexo=?, fechaIngreso=?\n    WHERE id=?";
    var consultaCompleta = mysql_1.default.prepararQuery(query, [cliente.nombre, cliente.sexo, cliente.fechaIngreso, cliente.Id]);
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
clientesRoutes.delete('/', function (req, res) {
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
exports.default = clientesRoutes;
