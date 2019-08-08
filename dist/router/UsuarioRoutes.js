"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Usuario_1 = __importDefault(require("../Class/Usuario"));
var Tokens_1 = __importDefault(require("../Class/Tokens"));
var usuarioRoutes = express_1.Router();
//Registro Usuario
usuarioRoutes.post('/registro', function (req, res) {
    var body = req.body;
    console.log(body);
    var consulta = "INSERT INTO usuario (nombre,email,password,role) VALUES (?,?,?,?);";
    var sqlfinal = mysql_1.default.prepararQuery(consulta, [body.nombre, body.email, body.password, 'DEFAULT']);
    mysql_1.default.ejecutarQuery(sqlfinal, function (err, usuario) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        return res.json({
            ok: true,
            usuario: usuario
        });
    });
});
//actualizar usuario
usuarioRoutes.put('/actualizar', function (req, res) {
    var body = req.body;
    var consulta = "UPDATE gym.usuario\n    SET \n      nombre = ?,\n      email = ?,\n      imagen = ?\n    WHERE id = ?;";
    var sql = mysql_1.default.prepararQuery(consulta, [body.nombre, body.email, body.imagen, body.id]);
    mysql_1.default.ejecutarQuery(sql, function (err, respuesta) {
        if (err) {
            return res.sendStatus(400).json({
                ok: false,
                mensaje: 'hubo un error al actualizar',
                err: err
            });
        }
        Usuario_1.default.obtenerusuarioPorId(body.id).then(function (nuevoUsuario) {
            var tokenUsuario = Tokens_1.default.getJwtToken({
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                password: nuevoUsuario.password,
                role: nuevoUsuario.role,
                img: nuevoUsuario.imagen
            });
            return res.json({
                ok: true,
                mensaje: 'se actualizo correctamente el usuario',
                usuario: nuevoUsuario,
                token: tokenUsuario
            });
        });
    });
});
//Login usuario
usuarioRoutes.post('/login', function (req, res) {
    var body = req.body;
    var consultaEmail = "SELECT * from Usuario where email = '" + body.email + "'";
    mysql_1.default.ejecutarQuery(consultaEmail, function (err, usuarios) {
        if (err) {
            res.status(400);
            return res.json({
                ok: false,
                mensaje: 'Usuario y/o contraseña no valido'
            });
        }
        if (req.body.password === usuarios[0].password) {
            var tokenUsuario = Tokens_1.default.getJwtToken({
                id: usuarios[0].id,
                nombre: usuarios[0].nombre,
                email: usuarios[0].email,
                password: usuarios[0].password,
                role: usuarios[0].role,
                img: usuarios[0].imagen
            });
            return res.json({
                ok: true,
                usuario: {
                    id: usuarios[0].id,
                    nombre: usuarios[0].nombre,
                    email: usuarios[0].email,
                    role: usuarios[0].role,
                    img: usuarios[0].imagen
                },
                token: tokenUsuario
            });
        }
        else {
            res.status(400);
            return res.json({
                ok: false,
                mensaje: 'Usuario y/o contraseña no valido'
            });
        }
    });
});
exports.default = usuarioRoutes;
