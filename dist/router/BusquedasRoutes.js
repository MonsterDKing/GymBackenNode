"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var busquedasRoutes = express_1.Router();
//Buscar cliente por codigo 
busquedasRoutes.get('/', function (req, res) {
    var codigo = req.query.codigo || 0;
    var id = req.query.id || 0;
    var nombre = req.query.nombre || '';
    if (codigo != 0) {
        var query = "SELECT * from clientes where codigo = ?";
        var sql = mysql_1.default.prepararQuery(query, [codigo]);
        mysql_1.default.ejecutarQuery(sql, function (err, cliente) {
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
    }
    if (id != 0) {
        console.log('entro');
        var query = "SELECT * from clientes where id = ?";
        var sql = mysql_1.default.prepararQuery(query, [id]);
        mysql_1.default.ejecutarQuery(sql, function (err, cliente) {
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
    }
    if (nombre != '') {
        var query = "SELECT * from clientes where nombre LIKE '%" + nombre + "%' ";
        // const sql = MySQL.prepararQuery(query, [nombre])
        mysql_1.default.ejecutarQuery(query, function (err, cliente) {
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
    }
});
exports.default = busquedasRoutes;
