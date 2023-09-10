import { Router } from 'express';
import ProductManager from '../manager/product.manager.js';

const router = Router();
const productManager = new ProductManager();

// Landing Page OK
router.get('/', (req, res) => {
    res.render('index', {});
});

// Products Catalog OK
router.get('/products', async (req, res) => {
    const products = await productManager.get();
    res.render('products_catalog', { products })
});


// Edit Product Catalog OK
router.get('/edit-products', async (req, res) => {
    const products = await productManager.get();
    res.render("realtimeProducts", { products });
});

// ADD PRODUCT
router.post('/form-products', async (req, res) => {
    const data = req.body;
    const result = await productManager.addProduct(data);
    console.log(result);

    res.redirect('/products');
});


// GET-ADD PRODUCTS REALTIME
router.get('/products-realtime', async (req, res) => {
    const products = await productManager.get();
    res.render('realtimeProducts', { products })
});


export default router