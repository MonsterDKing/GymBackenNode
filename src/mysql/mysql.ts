import mysql = require('mysql');

export default class MySQL{

    private static _instance:MySQL;
    con:mysql.Connection;
    conectado:boolean = false;
    

    constructor(){
        console.log('Clase inicializada');
        this.con = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'PER46807971s',
            database:'gym',
            port:3307
        });
        this.conectarDb();
        
    }

    public static get instance(){
        return this._instance || (this._instance = new this())
    }

    static ejecutarQuery(query:string, callback:Function){
        this.instance.con.query(query, (err,result:Object[], fields)=>{
            if(err){
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            if(result.length === 0){
                callback('No se encuentra registro');
            }else{
                callback(null,result)

            }
        });

    }

    static prepararQuery(consulta:any,valores:any){
        return mysql.format(consulta,valores);
    }
    

    private conectarDb(){
        this.con.connect( (err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message)
                return;
            }
            this.conectado = true;
            console.log('Base de datos online')
        })
    }



}