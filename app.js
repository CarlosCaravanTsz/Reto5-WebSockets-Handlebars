// LIBRARIES AND EXTERNAL SOURCES
import express, { urlencoded } from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import productRouter from './src/routes/product.router.js'
import cartRouter from './src/routes/cart.router.js'
import viewsRouter from './src/routes/views.router.js'
import ProductManager from './src/manager/product.manager.js'

// SERVER INIT CONFIG
const PORT = process.env.PORT || 8080;
const app = express();

// MIDDLEWARES CONFIG
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars')
app.use('/static', express.static(__dirname + '/src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // para leer desde req.body


// METODOS HTTPS
app.use('/', viewsRouter);


// SOCKET IO
const httpServer = app.listen(PORT, () =>
  console.log("Listening on port 8080...")
);
const io = new Server(httpServer);


// io socket for CRUD operations
io.on('connection', socket => {

    socket.on('operation', async (data) => {
        const productManager = new ProductManager();
        const { operation } = data;
        delete data.operation;
        console.log('PRODUCTO RECIBIDO TESTING: ', data);

        if (operation == "add") {
            await productManager.addProduct(data);
            const products = await productManager.get();
            socket.emit('reload-table', products);

        } else if (operation == 'update') {
            await productManager.updateProduct(data.id, data);
            const products = await productManager.get();
            socket.emit('reload-table', products);

        } else if (operation == 'delete') {
            await productManager.deleteProduct(data.id);
            const products = await productManager.get();
            socket.emit('reload-table', products);
        
        } else {
            console.log({ status: 'ERROR: Operacion no encontrada' });
        }



    });

});
