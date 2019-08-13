import { Request, Response, Router } from 'express';
import MySQL from '../mysql/mysql';
import Usuario from '../class/Usuario';
import Token from '../class/Tokens';

const usuarioRoutes = Router();

//Registro Usuario
usuarioRoutes.post('/registro', (req: Request, res: Response) => {
    const body = req.body;
    console.log(body)
    const consulta = `INSERT INTO usuario (nombre,email,password,role) VALUES (?,?,?,?);`;
    const sqlfinal = MySQL.prepararQuery(consulta, [body.nombre, body.email, body.password, 'DEFAULT'])
    MySQL.ejecutarQuery(sqlfinal, (err: any, usuario: any) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            usuario
        })
    });
});


//actualizar usuario

usuarioRoutes.put('/actualizar', (req: Request, res: Response) => {
    const body = req.body;
    const consulta = `UPDATE gym.usuario
    SET 
      nombre = ?,
      email = ?,
      imagen = ?
    WHERE id = ?;`
    const sql = MySQL.prepararQuery(consulta, [body.nombre, body.email, body.imagen, body.id])
    MySQL.ejecutarQuery(sql, (err: any, respuesta: any) => {
        if (err) {
            return res.sendStatus(400).json({
                ok: false,
                mensaje: 'hubo un error al actualizar',
                err
            })
        }
        Usuario.obtenerusuarioPorId(body.id).then( (nuevoUsuario:any)=>{
            const tokenUsuario = Token.getJwtToken({
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                password: nuevoUsuario.password,
                role: nuevoUsuario.role,
                img: nuevoUsuario.imagen
            });
            return res.json({
                ok: true,
                mensaje: 'se actualizo correctamente el usuario',
                usuario: nuevoUsuario,
                token:tokenUsuario
            })
        })
    });
})


//Login usuario
usuarioRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    const consultaEmail = `SELECT * from usuario where email = '${body.email}'`;
    MySQL.ejecutarQuery(consultaEmail, (err: any, usuarios: Usuario[]) => {
        if (err) {
            res.status(400);
            return res.json({
                ok: false,
                mensaje: 'Usuario y/o contraseña no valido'
            });
        }
        if (req.body.password === usuarios[0].password) {
            const tokenUsuario = Token.getJwtToken({
                id: usuarios[0].id,
                nombre: usuarios[0].nombre,
                email: usuarios[0].email,
                password: usuarios[0].password,
                role: usuarios[0].role,
                img: usuarios[0].imagen
            });
            return res.json({
                ok: true,
                usuario: {
                    id: usuarios[0].id,
                    nombre: usuarios[0].nombre,
                    email: usuarios[0].email,
                    role: usuarios[0].role,
                    img: usuarios[0].imagen
                },
                token: tokenUsuario
            })
        } else {
            res.status(400);
            return res.json({
                ok: false,
                mensaje: 'Usuario y/o contraseña no valido'
            })
        }
    });
});

export default usuarioRoutes;