import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';


const router = Router()

const cc = new CartController()

//corroborar que todos los carritos existen
router.get('/', cc.getAllCarts)
//traer un carrito
router.get('/:cid', cc.getCartById)
//crear un carrito con o sin productos
router.post('/', cc.createCart)
//Añadir productos al carrito
router.post('/:cid', cc.addProductToCart)
// // ENDPOINT para cambiar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', cc.updateProductQuantityInCart)
// // // ENDPOINT que actualiza la lista de productos en el carrito si es mayor a 0 lo suma y si es menor lo elimina
router.put('/:cid', cc.updateProductList)
// // ENDPOINT para eliminar un producto dado de un carrito
router.delete('/:cid/product/:pid', cc.deleteProductInCart)
// // ENDPOINT que elimina todos los productos de un carrito
router.delete('/:cid', cc.emptyCart)

export default router