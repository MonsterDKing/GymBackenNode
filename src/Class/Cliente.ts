import rn from './node_modules/random-number';
import MySQL from '../mysql/mysql';

export default class Cliente {

    Id?: number;
    nombre: String;
    sexo: boolean;
    codigo: number = this.generarCodigo();
    fechaIngreso: Date;
    estatus: boolean = true;
    img?:string;

    constructor(nombre: String, sexo: boolean, fechaIngreso: Date, Id?: number,img?:string) {
        this.nombre = nombre;
        this.sexo = sexo;
        this.fechaIngreso = fechaIngreso;
        this.Id = Id;
        this.img = img;
    }

    generarCodigo():number {
        const opciones = {
            min: 1000,
            max: 9999,
            integer: true
        }
        const codigo = Number(rn(opciones));
        this.verificarCodigo(codigo).then().catch( (err)=>{
            this.generarCodigo();
        })
        return Number(codigo);
    }

    invertirFecha():string{
        const fecha = this.fechaIngreso;
       return ''; 
    }

    
  verificarCodigo(codigo:number){
    return new Promise( (resolve,reject)=>{
        MySQL.ejecutarQuery(`SELECT * FROM clientes WHERE codigo = ${codigo}`, (err:any, respuesta:any)=>{
            if(err){
                resolve(true);
            }
            reject(false)
        });
    });
}

static actualizarCliente(cliente:Cliente){
    return new Promise((resolve, reject) => {
        const consulta = `UPDATE gym.clientes SET img = ? WHERE Id = ?`;
        const sql = MySQL.prepararQuery(consulta, [cliente.img,cliente.Id])
        MySQL.ejecutarQuery(sql, (err: any, clienteNuevo: any) => {
            if (err) {
                reject({
                    ok: false,
                    mensaje: err
                })
            }
            resolve({
                ok: true,
                usuario: clienteNuevo
            })
        })
    })
    
}



}