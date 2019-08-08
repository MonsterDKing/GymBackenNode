"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var estadisticasRoutes = express_1.Router();
//clientes que entraron en el dia
estadisticasRoutes.get('/entradasDia', function (req, res) {
    var date = new Date();
    var fechaParseada = date.toISOString().slice(0, 10);
    var consulta = "SELECT \n    c.nombre,\n    c.Sexo,\n    e.fechayhora,\n    c.codigo,\n    c.fechaIngreso \n  FROM\n    entradas e \n    INNER JOIN clientes c \n      ON c.Id = e.clienteid \n  WHERE DATE(fechayhora) = ? ";
    var sql = mysql_1.default.prepararQuery(consulta, [fechaParseada]);
    mysql_1.default.ejecutarQuery(sql, function (err, consulta) {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            });
        }
        return res.json({
            ok: true,
            clientes: consulta
        });
    });
});
//clientes que entraron en el mes
estadisticasRoutes.get('/entradasMes', function (req, res) {
    var date = new Date();
    var fechaBase1 = date.toISOString().slice(0, 7) + '-01';
    var fechaBase2 = date.toISOString().slice(0, 7) + '-30';
    ;
    var consulta = "SELECT \n    c.nombre,\n    c.Sexo,\n    e.fechayhora,\n    c.codigo,\n    c.fechaIngreso\n  FROM\n    entradas e \n    INNER JOIN clientes c \n      ON c.Id = e.clienteid \n  WHERE DATE(fechayhora) BETWEEN ? AND ? ";
    var sql = mysql_1.default.prepararQuery(consulta, [fechaBase1, fechaBase2]);
    mysql_1.default.ejecutarQuery(sql, function (err, consulta) {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            });
        }
        return res.json({
            ok: true,
            clientes: consulta
        });
    });
});
//clientes nuevos hoy
estadisticasRoutes.get('/clientesNHoy', function (req, res) {
    var date = new Date();
    var fechaParseada = date.toISOString().slice(0, 10);
    var consulta = "SELECT * FROM clientes c\n\tLEFT JOIN entradas e\n\tON c.Id = e.clienteid\n\tWHERE DATE(fechayhora) = ?\n\tGROUP BY c.Id ";
    var sql = mysql_1.default.prepararQuery(consulta, [fechaParseada]);
    mysql_1.default.ejecutarQuery(sql, function (err, consulta) {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            });
        }
        return res.json({
            ok: true,
            clientes: consulta
        });
    });
});
//clientes nuevos al mes
estadisticasRoutes.get('/clientesNMes', function (req, res) {
    var date = new Date();
    var fechaBase1 = date.toISOString().slice(0, 7) + '-01';
    var fechaBase2 = date.toISOString().slice(0, 7) + '-30';
    ;
    var consulta = "SELECT * FROM clientes c\n\tLEFT JOIN entradas e\n\tON c.Id = e.clienteid\n\tWHERE DATE(fechayhora) BETWEEN ? AND ? \n\tGROUP BY c.Id ";
    var sql = mysql_1.default.prepararQuery(consulta, [fechaBase1, fechaBase2]);
    mysql_1.default.ejecutarQuery(sql, function (err, consulta) {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            });
        }
        return res.json({
            ok: true,
            clientes: consulta
        });
    });
});
exports.default = estadisticasRoutes;
