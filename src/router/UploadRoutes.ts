import { Router, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import MySQL from '../mysql/mysql';
import fs from 'fs';
import Usuario from '../class/Usuario';
import Cliente from '../class/Cliente';
import { Producto } from '../class/Producto';

const uploadsRoutes = Router();
uploadsRoutes.use(fileUpload());


uploadsRoutes.put('/:tipo/:id', (req: Request, res: Response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //tipos permitidos
    const colecciones = ['usuario', 'cliente', 'producto']
    if (colecciones.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'tipos no valida',
            erros: { message: 'Los tipos validos son ' + colecciones.join(', ') }
        })
    }


    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            erros: { message: 'Debe de seleccionar una imagen' }
        })
    }

    //Obtener nombre dle archivo
    let archivo = req.files.imagen;
    let nombreCortado = archivo.name.split('.')
    let extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Solo estas extensiones aceptamos
    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'jfif']

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).send({
            ok: false,
            mensaje: 'Extension no valida',
            erros: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        })
    }

    // Nombre de archivo personalizado 
    //idusuario/numerorandom/extension de la foto
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`

    //mover el archivo del temporal a un path
    let path2 = path.join(__dirname, '../' + `/uploads/${tipo}/${nombreArchivo}`);
    console.log(path2);


    archivo.mv(path2, (err: any) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                erros: err
            })
        }
        subirporTipo(tipo, id, nombreArchivo, res);
    })




});

function subirporTipo(tipo: any, id: any, nombreArchivo: any, res: Response) {
    if (tipo === 'usuario') {
        MySQL.ejecutarQuery(`SELECT * from usuario where id = ${id}`, (err: any, rr: any) => {
            const resultado = rr[0];
            let pathViejo = path.join(__dirname, '../' + `/uploads/usuario/${resultado.img}`);
            console.log('patchviejo = ' + pathViejo);
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, err => {
                    console.log(err);
                });
            }
            resultado.img = nombreArchivo;
            console.log(nombreArchivo);
            console.log(resultado);
            Usuario.actualizarUsuario(resultado).then(usuarioNuevo => {
                Usuario.obtenerusuarioPorId(id).then( (usuarioListo:any)=>{
                    res.json({
                        ok: true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioListo
    
                    })
                })
            }).catch(err => { console.log(err); })
        });
        return;
    }
    if (tipo === 'cliente') {
        MySQL.ejecutarQuery(`SELECT * FROM clientes where id = ${id}`, (err: any, rr: any) => {
            const resultado = rr[0];
            let pathViejo = path.join(__dirname, '../' + `/uploads/cliente/${resultado.img}`);
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, err => {
                    console.log(err);
                });
            }
            resultado.img = nombreArchivo;
            console.log('resultado',resultado);
            Cliente.actualizarCliente(resultado).then(clienteNuevo => {
                res.json({
                    ok: true,
                    mensaje: 'Imagen de cliente actualizada',
                    usuario: clienteNuevo

                })
            }).catch(err => { console.log(err); })
        });
        return;
    }
    if (tipo === 'producto') {
        MySQL.ejecutarQuery(`SELECT * FROM producto where id = ${id}`, (err: any, rr: any) => {
            const resultado = rr[0];
            let pathViejo = path.join(__dirname, '../' + `/uploads/producto/${resultado.img}`);

            if (fs.existsSync(pathViejo)) {
                console.log('existe');
                fs.unlink(pathViejo, err => {
                    console.log(err);
                });
            }
            resultado.img = nombreArchivo;
            Producto.actualizar(resultado).then(elemento => {
                res.json({
                    ok: true,
                    mensaje: 'Imagen de Producto actualizada',
                    usuario: elemento

                })
            }).catch(err => { console.log(err); })
        });
        return;
    }
}

export default uploadsRoutes;