import {Router,Request,Response} from 'express';
import path  from 'path';
import fs from 'fs';

const imagenesRoutes= Router();

imagenesRoutes.get('/:tipo/:img', (req:Request,res:Response)=>{
    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImagen = path.resolve(__dirname,`../uploads/${tipo}/${img}`)
    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        const pathNoImage = path.resolve(__dirname,'../uploads/no-img.jpg');
        res.sendFile(pathNoImage)
    }
});

export default imagenesRoutes;