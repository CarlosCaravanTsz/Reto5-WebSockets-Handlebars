import { Router } from 'express';
import ProductManager from '../manager/product.manager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    res.render('index', {});
});


//GET PRODUCTS
router.get('/products', async (req, res) => {
    const products = await productManager.get();
    res.render('products', { products })
});

// GET-ADD PRODUCTS REALTIME
router.get('/products-realtime', async (req, res) => {
    const products = await productManager.get();
    res.render('realtimeProducts', { products })
});


// ADD PRODUCTS
router.get('/form-products', async (req, res) => {
    res.render('form', {})
});

router.post('/form-products', async (req, res) => {
    const data = req.body;
    const result = await productManager.addProduct(data);
    console.log(result);


    res.redirect('/products');
});


export default router