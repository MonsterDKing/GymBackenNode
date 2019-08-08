"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Pagos_1 = require("../Class/Pagos");
var pagoRoutes = express_1.Router();
//obtener todo los pagos
pagoRoutes.get('/', function (req, res) {
    mysql_1.default.ejecutarQuery('SELECT * FROM pagos', function (err, respuesta) {
        if (err) {
            return res.json({
                ok: true,
                pagos: []
            });
        }
        return res.json({
            ok: true,
            pagos: respuesta
        });
    });
});
//realizar pago
pagoRoutes.get('/pago/:id', function (req, res) {
    var id = req.params.id;
    Pagos_1.Pago.efectuarPagoMes(id).then(function (resp) {
        return res.json({
            ok: true,
            mensaje: 'Pago realizado correctamente'
        });
    });
});
exports.default = pagoRoutes;
