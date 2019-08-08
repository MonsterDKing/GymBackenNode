"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var random_number_1 = __importDefault(require("./node_modules/random-number"));
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Cliente = /** @class */ (function () {
    function Cliente(nombre, sexo, fechaIngreso, Id, img) {
        this.codigo = this.generarCodigo();
        this.estatus = true;
        this.nombre = nombre;
        this.sexo = sexo;
        this.fechaIngreso = fechaIngreso;
        this.Id = Id;
        this.img = img;
    }
    Cliente.prototype.generarCodigo = function () {
        var _this = this;
        var opciones = {
            min: 1000,
            max: 9999,
            integer: true
        };
        var codigo = Number(random_number_1.default(opciones));
        this.verificarCodigo(codigo).then().catch(function (err) {
            _this.generarCodigo();
        });
        return Number(codigo);
    };
    Cliente.prototype.invertirFecha = function () {
        var fecha = this.fechaIngreso;
        return '';
    };
    Cliente.prototype.verificarCodigo = function (codigo) {
        return new Promise(function (resolve, reject) {
            mysql_1.default.ejecutarQuery("SELECT * FROM clientes WHERE codigo = " + codigo, function (err, respuesta) {
                if (err) {
                    resolve(true);
                }
                reject(false);
            });
        });
    };
    Cliente.actualizarCliente = function (cliente) {
        return new Promise(function (resolve, reject) {
            var consulta = "UPDATE gym.clientes SET img = ? WHERE Id = ?";
            var sql = mysql_1.default.prepararQuery(consulta, [cliente.img, cliente.Id]);
            mysql_1.default.ejecutarQuery(sql, function (err, clienteNuevo) {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: err
                    });
                }
                resolve({
                    ok: true,
                    usuario: clienteNuevo
                });
            });
        });
    };
    return Cliente;
}());
exports.default = Cliente;
