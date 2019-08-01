"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var random_number_1 = __importDefault(require("random-number"));
var Cliente = /** @class */ (function () {
    function Cliente(nombre, sexo, fechaIngreso, Id) {
        this.codigo = this.generarCodigo();
        this.estatus = true;
        this.nombre = nombre;
        this.sexo = sexo;
        this.fechaIngreso = fechaIngreso;
        this.Id = Id;
    }
    Cliente.prototype.generarCodigo = function () {
        var opciones = {
            min: 1000,
            max: 9999,
            integer: true
        };
        var codigo = Number(random_number_1.default(opciones));
        return Number(codigo);
    };
    return Cliente;
}());
exports.default = Cliente;
