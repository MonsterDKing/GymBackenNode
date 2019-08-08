"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var imagenesRoutes = express_1.Router();
imagenesRoutes.get('/:tipo/:img', function (req, res) {
    var tipo = req.params.tipo;
    var img = req.params.img;
    var pathImagen = path_1.default.resolve(__dirname, "../uploads/" + tipo + "/" + img);
    if (fs_1.default.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    }
    else {
        var pathNoImage = path_1.default.resolve(__dirname, '../uploads/no-img.jpg');
        res.sendFile(pathNoImage);
    }
});
exports.default = imagenesRoutes;
