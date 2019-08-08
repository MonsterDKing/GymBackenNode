import { Marca } from "./Marca";
import MySQL from "../mysql/mysql";
import { rejects } from "assert";

export class Producto {
    nombre: string;
    marca: Marca;
    proveedor: string;
    cantidad: number;
    precio: number;
    almacen: number;
    id?: number;
    imagen?:string;

    constructor(
        nombre: string,
        marca: Marca,
        proveedor: string,
        cantidad: number,
        precio: number,
        almacen: number,
        id?: number,
        imagen?:string) {
        this.nombre = nombre;
        this.marca = marca;
        this.proveedor = proveedor;
        this.cantidad = cantidad;
        this.precio = precio;
        this.almacen = almacen;
        this.id = id;
        this.imagen = imagen;
    }

    static actualizar(inventario: Producto) {
        return new Promise((resolve, reject) => {
            const sql = MySQL.prepararQuery(`UPDATE gym.producto
        SET nombre = ?,
         marca = ?,
         proveedor = ?,
         cantidad = ?,
         precio = ?,
         almacen = ?,
         imagen = ?
       WHERE id = ?;`, [inventario.nombre, inventario.marca, inventario.proveedor, inventario.cantidad, inventario.precio, inventario.almacen,inventario.imagen ,inventario.id]);
            MySQL.ejecutarQuery(sql, (err: any, respuesta: any) => {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: err
                    })
                }
                resolve({
                    ok: true,
                    mensaje: respuesta
                })
            });
        });
    }

    static insertar(inventario: Producto) {
        return new Promise((resolve, reject) => {
            const sql = MySQL.prepararQuery(`INSERT INTO gym.producto
            (nombre,
             marca,
             proveedor,
             cantidad,
             precio,
             almacen,
             imagen)
            VALUES (?,?,?,?,?,?);`, [inventario.nombre, inventario.marca, inventario.proveedor, inventario.cantidad, inventario.precio, inventario.almacen, inventario.id]);
            MySQL.ejecutarQuery(sql, (err: any, respuesta: any) => {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: err
                    })
                }
                resolve({
                    ok: true,
                    mensaje: respuesta
                })
            });

        })
    }

}