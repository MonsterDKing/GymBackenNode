"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var dateformat_1 = __importDefault(require("./node_modules/dateformat"));
var Pago = /** @class */ (function () {
    function Pago(id, fecha, cliente) {
        this.id = id;
        this.fecha = fecha;
        this.cliente = cliente;
    }
    Pago.efectuarPagoMes = function (idcliente) {
        return new Promise(function (resolve, reject) {
            var fechaHoy = new Date();
            var fechaParseada = fechaHoy.toISOString().slice(0, 10);
            var sql = mysql_1.default.prepararQuery('INSERT INTO pagos(fecha,cliente) VALUES (?,?)', [fechaParseada, idcliente]);
            mysql_1.default.ejecutarQuery(sql, function (err, respuesta) {
                if (err) {
                    reject(err);
                }
                resolve(respuesta);
            });
        });
    };
    Pago.prototype.setearFecha = function (fecha) {
        return dateformat_1.default(fecha, 'yyyy-mm-dd');
    };
    return Pago;
}());
exports.Pago = Pago;
