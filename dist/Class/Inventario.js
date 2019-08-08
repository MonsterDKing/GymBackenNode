"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Inventario = /** @class */ (function () {
    function Inventario(nombre, marca, proveedor, cantidad, precio, almacen, id) {
        this.nombre = nombre;
        this.marca = marca;
        this.proveedor = proveedor;
        this.cantidad = cantidad;
        this.precio = precio;
        this.almacen = almacen;
        this.id = id;
    }
    Inventario.actualizar = function (inventario) {
        return new Promise(function (resolve, reject) {
            var sql = mysql_1.default.prepararQuery("UPDATE gym.inventario\n        SET nombre = ?,\n         marca = ?,\n         proveedor = ?,\n         cantidad = ?,\n         precio = ?,\n         almacen = ?\n       WHERE id = ?;", [inventario.nombre, inventario.marca, inventario.proveedor, inventario.cantidad, inventario.precio, inventario.almacen, inventario.id]);
            mysql_1.default.ejecutarQuery(sql, function (err, respuesta) {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: err
                    });
                }
                resolve({
                    ok: true,
                    mensaje: respuesta
                });
            });
        });
    };
    Inventario.insertar = function (inventario) {
        return new Promise(function (resolve, reject) {
            var sql = mysql_1.default.prepararQuery("INSERT INTO gym.inventario\n            (nombre,\n             marca,\n             proveedor,\n             cantidad,\n             precio,\n             almacen)\n            VALUES (?,?,?,?,?,?);", [inventario.nombre, inventario.marca, inventario.proveedor, inventario.cantidad, inventario.precio, inventario.almacen, inventario.id]);
            mysql_1.default.ejecutarQuery(sql, function (err, respuesta) {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: err
                    });
                }
                resolve({
                    ok: true,
                    mensaje: respuesta
                });
            });
        });
    };
    return Inventario;
}());
exports.Inventario = Inventario;
