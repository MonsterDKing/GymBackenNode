import {Request,Response,NextFunction} from 'express';
import Token from '../Class/Tokens';
const x = require('../Class/Tokens');

export const verificaToken = (req:any,res:Response,next:NextFunction) =>{
    const userToken = req.get('x-token') || '';
    x.

    Token.comprobarToken(userToken).then( (decoded:any) =>{
        console.log(decoded)
        req.usuario = decoded.usuario
        next();
    }).catch(err =>{
        res.json({
            ok:false,
            mensaje:'Token no es correcto',
        })
    });

}