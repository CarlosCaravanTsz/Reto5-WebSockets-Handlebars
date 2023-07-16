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
//app.use('/api/products', productRouter);
//app.use('/api/carts', cartRouter);


// SOCKET IO
const httpServer = app.listen(8080, () => console.log('Listening on port 8080...'));
const io = new Server(httpServer);

io.on('connection', socket => {
    io.on('new-product', async (data) => {
        const productManager = new ProductManager();
        await productManager.addProduct(data);

        const products = await productManager.get();
        socket.emit('reload-table', products);
    });

});
