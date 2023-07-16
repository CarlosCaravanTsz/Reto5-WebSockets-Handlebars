import { Router } from 'express';
import ProductManager from '../manager/product.manager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {  // LISTAR TODOS LOS PRODUCTOS (LIMIT OPCIONAL)
    try {
        const limit = req.query.limit;
        const result = await productManager.get(limit);
        res.status(200).send(result);
    } catch {
        res.status(500).send({ status: 'ERROR al listar productos' });
    }
});


router.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const result = await productManager.getById(pid)
        res.status(200).send(result);
    } catch {
        res.status(500).send({ status: 'ERROR al listar productos' });
    }
});


router.post('/', async (req, res) => { // DONE: AGREGAR UN NUEVO PRODUCTO
    try {
        const new_product = {
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            status: true,
            stock: req.body.stock,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
        };

        console.log(new_product);
        const result = await productManager.addProduct(new_product);
        const status = result ? result : { status: 'Error al agregar producto' };
        res.status(200).send(status);
    } catch {
        res.status(500).send({ status: 'ERROR al agregar un producto' });

    }

});


router.put('/:pid', async (req, res) => {

    try {
        const obj = req.body;
        const pid = parseInt(req.params.pid);
        const result = await productManager.updateProduct(pid, obj);
        const status = result ? result : { status: 'Error al actualizar producto' };
        res.status(200).send(status);
    } catch {
        res.status(500).send({ status: 'ERROR al actualizar un producto' });

    }
});


router.delete('/:pid', async (req, res) => { // DEBE ELIMINAR (DESHABILITAR) EL PRODUCTO CON PID INDICADO
    try {
        const pid = parseInt(req.params.pid);
        const result = await productManager.deleteProduct(pid)
        const status = result ? result : { status: 'Error al eliminar producto' };
        res.status(200).send(status);
    } catch {
        res.status(500).send({ status: 'ERROR al eliminar un producto' });
    }
});

export default router