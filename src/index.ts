import Server from './server/server';
import router from './router/pruebasroute';
import bodyParser = require('body-parser');
import clientesRoutes from './router/ClienteRoute';



const server = Server.init(3000);


//midleware de transformar post to object 
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//rutas
server.app.use('/clientes', clientesRoutes);


server.start(()=>{
    console.log('Servidor corriendo en el puerto 3000');
})