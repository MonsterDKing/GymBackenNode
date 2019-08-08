"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var bodyParser = require("body-parser");
var ClienteRoute_1 = __importDefault(require("./router/ClienteRoute"));
var BusquedasRoutes_1 = __importDefault(require("./router/BusquedasRoutes"));
var UsuarioRoutes_1 = __importDefault(require("./router/UsuarioRoutes"));
var EntradasRoutes_1 = __importDefault(require("./router/EntradasRoutes"));
var EstadisticasRoutes_1 = __importDefault(require("./router/EstadisticasRoutes"));
var UploadRoutes_1 = __importDefault(require("./router/UploadRoutes"));
var ImagenesRoutes_1 = __importDefault(require("./router/ImagenesRoutes"));
var PagosRoutes_1 = __importDefault(require("./router/PagosRoutes"));
var env_1 = require("./config/env");
var server = server_1.default.init(env_1.PUERTO);
//midleware de transformar post to object 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//CORS
server.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE ,OPTION ");
    next();
});
//rutas
server.app.use('/clientes', ClienteRoute_1.default);
server.app.use('/busquedas', BusquedasRoutes_1.default);
server.app.use('/usuario', UsuarioRoutes_1.default);
server.app.use('/entradas', EntradasRoutes_1.default);
server.app.use('/estadisticas', EstadisticasRoutes_1.default);
server.app.use('/upload', UploadRoutes_1.default);
server.app.use('/img', ImagenesRoutes_1.default);
server.app.use('/pagos', PagosRoutes_1.default);
server.start(function () {
    console.log('Servidor corriendo en el puerto 3000');
});
