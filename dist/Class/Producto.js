"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Producto = /** @class */ (function () {
    function Producto(nombre, marca, proveedor, cantidad, precio, almacen, id, imagen) {
        this.nombre = nombre;
        this.marca = marca;
        this.proveedor = proveedor;
        this.cantidad = cantidad;
        this.precio = precio;
        this.almacen = almacen;
        this.id = id;
        this.imagen = imagen;
    }
    Producto.actualizar = function (inventario) {
        return new Promise(function (resolve, reject) {
            var sql = mysql_1.default.prepararQuery("UPDATE gym.producto\n        SET nombre = ?,\n         marca = ?,\n         proveedor = ?,\n         cantidad = ?,\n         precio = ?,\n         almacen = ?,\n         imagen = ?\n       WHERE id = ?;", [inventario.nombre, inventario.marca, inventario.proveedor, inventario.cantidad, inventario.precio, inventario.almacen, inventario.imagen, inventario.id]);
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
    Producto.insertar = function (inventario) {
        return new Promise(function (resolve, reject) {
            var sql = mysql_1.default.prepararQuery("INSERT INTO gym.producto\n            (nombre,\n             marca,\n             proveedor,\n             cantidad,\n             precio,\n             almacen,\n             imagen)\n            VALUES (?,?,?,?,?,?);", [inventario.nombre, inventario.marca, inventario.proveedor, inventario.cantidad, inventario.precio, inventario.almacen, inventario.id]);
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
    return Producto;
}());
exports.Producto = Producto;
