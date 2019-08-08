import {Router,Request,Response} from 'express';
import MySQL from '../mysql/mysql';
import { Pago } from '../class/Pagos';

const pagoRoutes = Router();

//obtener todo los pagos
pagoRoutes.get('/', (req:Request,res:Response)=>{
    MySQL.ejecutarQuery('SELECT * FROM pagos',(err:any,respuesta:Pago[])=>{
        if(err){
            return res.json({
                ok:true,
                pagos:[]
            })
        }
        return res.json({
            ok:true,
            pagos: respuesta
        })
    })
});

//realizar pago
pagoRoutes.get('/pago/:id', (req:Request,res:Response)=>{
    const id = req.params.id;
    Pago.efectuarPagoMes(id).then( (resp:any) =>{
        return res.json({
            ok:true,
            mensaje:'Pago realizado correctamente'
        })
    })
});

export default pagoRoutes;