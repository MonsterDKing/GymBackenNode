import MySQL from "../mysql/mysql";

export default class Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    role: string;
    img:string;

    constructor(id: number, nombre: string, email: string, password: string, role: string, img:any) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.role = role;
        this.img = img;
    }

    static actualizarUsuario(usuario: Usuario) {
        return new Promise((resolve, reject) => {
            const consulta = `UPDATE usuario
        SET nombre=?, email=?, password = ?,img = ?
        WHERE id = ? `
            const sql = MySQL.prepararQuery(consulta, [usuario.nombre, usuario.email, usuario.password,usuario.img,usuario.id])
            console.log('consulta de actualiacion',sql);
            MySQL.ejecutarQuery(sql, (err: any, usuarioNuevo: any) => {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: err
                    })
                }
                resolve({
                    ok: true,
                    usuario: usuarioNuevo
                })
            })
        })
    }

    static obtenerusuarioPorId(id:number){
        return new Promise((resolve, reject) => {
            const consulta = `SELECT * from usuario where id = ${id}`
            MySQL.ejecutarQuery(consulta, (err: any, usuarioNuevo: any) => {
                if (err) {
                    reject({
                        ok: false,
                        mensaje: 'no se encuentra usuario con ese id'
                    })
                }
                resolve(usuarioNuevo[0])
            })
        })
    }

}