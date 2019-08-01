"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var bodyParser = require("body-parser");
var ClienteRoute_1 = __importDefault(require("./router/ClienteRoute"));
var server = server_1.default.init(3000);
//midleware de transformar post to object 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//rutas
server.app.use('/clientes', ClienteRoute_1.default);
server.start(function () {
    console.log('Servidor corriendo en el puerto 3000');
});
