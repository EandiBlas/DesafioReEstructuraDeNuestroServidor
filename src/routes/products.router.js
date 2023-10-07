import { Router } from 'express';
const router = Router()

import ProductController from '../controllers/product.controller.js';

const pc = new ProductController();

// traer todos los productos
router.get('/', pc.getAllProducts)
//traer un solo producto
router.get('/:pid', pc.getProduct)
//Añadir un producto
router.post('/', pc.addProduct)
//Actualizar un producto
router.put('/:pid', pc.updateProduct)
//Eliminar un producto
router.delete('/:pid', pc.deleteProduct)


export default router