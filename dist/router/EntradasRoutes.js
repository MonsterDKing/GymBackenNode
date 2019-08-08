"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var entradasRoutes = express_1.Router();
//obtener entradas del dia
entradasRoutes.get('/dia', function (req, res) {
    var date = new Date();
    var fechaParseada = date.toISOString().slice(0, 10);
    var consulta = "SELECT \n    c.nombre,\n    c.Sexo,\n    e.fechayhora,\n    c.codigo,\n    c.fechaIngreso \n  FROM\n    entradas e \n    INNER JOIN clientes c \n      ON c.Id = e.clienteid \n  WHERE DATE(fechayhora) = ? ";
    var sql = mysql_1.default.prepararQuery(consulta, [fechaParseada]);
    console.log(sql);
    mysql_1.default.ejecutarQuery(sql, function (err, resultados) {
        if (err) {
            return res.json({
                ok: true,
                clientes: []
            });
        }
        return res.json({
            ok: true,
            clientes: resultados
        });
    });
});
//insertar entrada del dia 
entradasRoutes.post('/', function (req, res) {
    var body = req.body;
    var primeraConsulta = "SELECT * from clientes where codigo = " + body.codigo;
    mysql_1.default.ejecutarQuery(primeraConsulta, function (err, resultado) {
        if (err) {
            return res.json({
                ok: false,
                mensaje: 'Codigo de cliente no existe'
            });
        }
        /// AQUI YA ESTA TODO BIEN 
        var horayfecha = new Date().toLocaleString();
        var consulta = "INSERT INTO entradas (codigo,fechayhora,clienteid) VALUES(?,?,?)";
        var sql = mysql_1.default.prepararQuery(consulta, [resultado[0].codigo, horayfecha, resultado[0].Id]);
        mysql_1.default.ejecutarQuery(sql, function (err, resultado) {
            if (err) {
                res.json({
                    ok: false,
                    mensaje: 'No se encuentra el codigo disponible'
                });
            }
            return res.json({
                ok: true,
                mensaje: 'Entrada registrada Correctamente'
            });
        });
    });
});
exports.default = entradasRoutes;
