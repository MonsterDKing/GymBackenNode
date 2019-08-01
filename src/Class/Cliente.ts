import rn from 'random-number';

export default class Cliente {

    Id?: number;
    nombre: String;
    sexo: boolean;
    codigo: number = this.generarCodigo();
    fechaIngreso: Date;
    estatus: boolean = true;

    constructor(nombre: String, sexo: boolean, fechaIngreso: Date, Id?: number) {
        this.nombre = nombre;
        this.sexo = sexo;
        this.fechaIngreso = fechaIngreso;
        this.Id = Id;
    }

    generarCodigo():number {
        const opciones = {
            min: 1000,
            max: 9999,
            integer: true
        }
        const codigo = Number(rn(opciones))
        return Number(codigo);
    }



}