import express = require('express');
import path = require('path');

export default class Server{
    public app: express.Application;
    public port: number;

    constructor(puerto:number){
        this.port = puerto;
        this.app = express();
    }

    static init(puerto:number){
        return new Server(puerto);
    }

    private publicFoldeR(){
        const publicpath = path.resolve(__dirname, '../public')
        this.app.use(express.static(publicpath));
    }

    start(callback:any){
        this.app.listen(this.port,callback);
        this.publicFoldeR();
    }

}