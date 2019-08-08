"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = require('../Class/Tokens');
exports.verificaToken = function (req, res, next) {
    var userToken = req.get('x-token') || '';
    x.
        Token.comprobarToken(userToken).then(function (decoded) {
        console.log(decoded);
        req.usuario = decoded.usuario;
        next();
    }).catch(function (err) {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto',
        });
    });
};
