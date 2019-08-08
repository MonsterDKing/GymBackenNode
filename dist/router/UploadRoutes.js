"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var path_1 = __importDefault(require("path"));
var mysql_1 = __importDefault(require("../mysql/mysql"));
var fs_1 = __importDefault(require("fs"));
var Usuario_1 = __importDefault(require("../Class/Usuario"));
var Cliente_1 = __importDefault(require("../Class/Cliente"));
var Producto_1 = require("../Class/Producto");
var uploadsRoutes = express_1.Router();
uploadsRoutes.use(express_fileupload_1.default());
uploadsRoutes.put('/:tipo/:id', function (req, res) {
    var tipo = req.params.tipo;
    var id = req.params.id;
    //tipos permitidos
    var colecciones = ['usuario', 'cliente', 'producto'];
    if (colecciones.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'tipos no valida',
            erros: { message: 'Los tipos validos son ' + colecciones.join(', ') }
        });
    }
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            erros: { message: 'Debe de seleccionar una imagen' }
        });
    }
    //Obtener nombre dle archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];
    //Solo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'jfif'];
    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).send({
            ok: false,
            mensaje: 'Extension no valida',
            erros: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }
    // Nombre de archivo personalizado 
    //idusuario/numerorandom/extension de la foto
    var nombreArchivo = id + "-" + new Date().getMilliseconds() + "." + extensionArchivo;
    //mover el archivo del temporal a un path
    var path2 = path_1.default.join(__dirname, '../' + ("/uploads/" + tipo + "/" + nombreArchivo));
    console.log(path2);
    archivo.mv(path2, function (err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                erros: err
            });
        }
        subirporTipo(tipo, id, nombreArchivo, res);
    });
});
function subirporTipo(tipo, id, nombreArchivo, res) {
    if (tipo === 'usuario') {
        mysql_1.default.ejecutarQuery("SELECT * from usuario where id = " + id, function (err, rr) {
            var resultado = rr[0];
            var pathViejo = path_1.default.join(__dirname, '../' + ("/uploads/usuario/" + resultado.img));
            console.log('patchviejo = ' + pathViejo);
            if (fs_1.default.existsSync(pathViejo)) {
                fs_1.default.unlink(pathViejo, function (err) {
                    console.log(err);
                });
            }
            resultado.img = nombreArchivo;
            console.log(nombreArchivo);
            console.log(resultado);
            Usuario_1.default.actualizarUsuario(resultado).then(function (usuarioNuevo) {
                Usuario_1.default.obtenerusuarioPorId(id).then(function (usuarioListo) {
                    res.json({
                        ok: true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioListo
                    });
                });
            }).catch(function (err) { console.log(err); });
        });
        return;
    }
    if (tipo === 'cliente') {
        mysql_1.default.ejecutarQuery("SELECT * FROM clientes where id = " + id, function (err, rr) {
            var resultado = rr[0];
            var pathViejo = path_1.default.join(__dirname, '../' + ("/uploads/cliente/" + resultado.img));
            if (fs_1.default.existsSync(pathViejo)) {
                fs_1.default.unlink(pathViejo, function (err) {
                    console.log(err);
                });
            }
            resultado.img = nombreArchivo;
            console.log('resultado', resultado);
            Cliente_1.default.actualizarCliente(resultado).then(function (clienteNuevo) {
                res.json({
                    ok: true,
                    mensaje: 'Imagen de cliente actualizada',
                    usuario: clienteNuevo
                });
            }).catch(function (err) { console.log(err); });
        });
        return;
    }
    if (tipo === 'producto') {
        mysql_1.default.ejecutarQuery("SELECT * FROM producto where id = " + id, function (err, rr) {
            var resultado = rr[0];
            var pathViejo = path_1.default.join(__dirname, '../' + ("/uploads/producto/" + resultado.img));
            if (fs_1.default.existsSync(pathViejo)) {
                console.log('existe');
                fs_1.default.unlink(pathViejo, function (err) {
                    console.log(err);
                });
            }
            resultado.img = nombreArchivo;
            Producto_1.Producto.actualizar(resultado).then(function (elemento) {
                res.json({
                    ok: true,
                    mensaje: 'Imagen de Producto actualizada',
                    usuario: elemento
                });
            }).catch(function (err) { console.log(err); });
        });
        return;
    }
}
exports.default = uploadsRoutes;
