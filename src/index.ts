import Server from './server/server';
import bodyParser = require('body-parser');
import clientesRoutes from './router/ClienteRoute';
import busquedasRoutes from './router/BusquedasRoutes';
import usuarioRoutes from './router/UsuarioRoutes';
import entradasRoutes from './router/EntradasRoutes';
import estadisticasRoutes from './router/EstadisticasRoutes';
import uploadsRoutes from './router/UploadRoutes';
import imagenesRoutes from './router/ImagenesRoutes';
import pagoRoutes from './router/PagosRoutes';



const server = Server.init(3000);


//midleware de transformar post to object 
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE ,OPTION ")
    next();
  });

//rutas
server.app.use('/clientes', clientesRoutes);
server.app.use('/busquedas', busquedasRoutes);
server.app.use('/usuario', usuarioRoutes);
server.app.use('/entradas', entradasRoutes);
server.app.use('/estadisticas', estadisticasRoutes);
server.app.use('/upload', uploadsRoutes);
server.app.use('/img', imagenesRoutes);
server.app.use('/pagos', pagoRoutes);

server.start(()=>{
    console.log('Servidor corriendo en el puerto 3000');
})