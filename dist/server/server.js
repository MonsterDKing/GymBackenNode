"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var Server = /** @class */ (function () {
    function Server(puerto) {
        this.port = puerto;
        this.app = express();
    }
    Server.init = function (puerto) {
        return new Server(puerto);
    };
    Server.prototype.publicFoldeR = function () {
        var publicpath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicpath));
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
        this.publicFoldeR();
    };
    return Server;
}());
exports.default = Server;
