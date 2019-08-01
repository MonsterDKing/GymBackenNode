"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'PER46807971s',
            database: 'gym',
            port: 3307
        });
        this.conectarDb();
    }
    Object.defineProperty(MySQL, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    MySQL.ejecutarQuery = function (query, callback) {
        this.instance.con.query(query, function (err, result, fields) {
            if (err) {
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            if (result.length === 0) {
                callback('No se encuentra registro');
            }
            else {
                callback(null, result);
            }
        });
    };
    MySQL.prepararQuery = function (consulta, valores) {
        return mysql.format(consulta, valores);
    };
    MySQL.prototype.conectarDb = function () {
        var _this = this;
        this.con.connect(function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            _this.conectado = true;
            console.log('Base de datos online');
        });
    };
    return MySQL;
}());
exports.default = MySQL;
