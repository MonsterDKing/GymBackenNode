"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Usuario = /** @class */ (function () {
    function Usuario(id, nombre, email, password, role, img) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.role = role;
        this.img = img;
    }
    Usuario.actualizarUsuario = function (usuario) {
        return new Promise(function (resolve, reject) {
            var consulta = "UPDATE usuario\n        SET nombre=?, email=?, password = ?,img = ?\n        WHERE id = ? ";
            var sql = mysql_1.default.prepararQuery(consulta, [usuario.nombre, usuario.email, usuario.password, usuario.img, usuario.id]);
            console.log('consulta de actualiacion', sql);
            mysql_1.default.ejecutarQuery(sql, function (err, usuarioNuevo) {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: err
                    });
                }
                resolve({
                    ok: true,
                    usuario: usuarioNuevo
                });
            });
        });
    };
    Usuario.obtenerusuarioPorId = function (id) {
        return new Promise(function (resolve, reject) {
            var consulta = "SELECT * from usuario where id = " + id;
            mysql_1.default.ejecutarQuery(consulta, function (err, usuarioNuevo) {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: 'no se encuentra usuario con ese id'
                    });
                }
                resolve(usuarioNuevo[0]);
            });
        });
    };
    return Usuario;
}());
exports.default = Usuario;
