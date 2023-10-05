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
// // ENDPOINT para cambiar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', cc.updateProductQuantityInCart)
// // // ENDPOINT que actualiza la lista de productos en el carrito
router.put('/:cid')
// // ENDPOINT para eliminar un producto dado de un carrito
// router.delete('/:cid/product/:pid', async (req, res) => {
//   try {
//     // Extraer los parámetros de la URL: cid (ID del carrito) y pid (ID del producto)
//     const { cid, pid } = req.params;

//     // Verificar si el producto con el ID pid existe
//     const checkIdProduct = await pm.getProductById(pid);
//     if (!checkIdProduct) {
//       return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found` });
//     }

//     // Verificar si el carrito con el ID cid existe
//     const checkIdCart = await cm.getCartById(cid);
//     if (!checkIdCart) {
//       return res.status(404).send({ status: 'error', message: `Cart with ID: ${cid} not found` });
//     }

//     // Buscar el índice del producto en la lista de productos del carrito
//     const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
//     if (findProductIndex === -1) {
//       return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found in cart` });
//     }

//     // Eliminar el producto de la lista de productos del carrito
//     checkIdCart.products.splice(findProductIndex, 1);

//     // Actualizar el carrito en la base de datos sin el producto eliminado
//     const updatedCart = await cm.deleteProductInCart(cid, checkIdCart.products);

//     return res.status(200).send({ status: 'success', message: `Deleted product with ID: ${pid}`, cart: updatedCart });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
//   }
// });
// // ENDPOINT que elimina todos los productos de un carrito
// router.delete('/:cid', async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const cart = await cm.getCartById(cid);

//     if (!cart) {
//       return res.status(404).send({ message: `Cart with ID: ${cid} not found` });
//     }

//     if (cart.products.length === 0) {
//       return res.status(404).send({ message: 'The cart is already empty' });
//     }

//     // Vaciar el carrito estableciendo la propiedad 'products' como un arreglo vacío.
//     cart.products = [];

//     await cm.updateOneProduct(cid, cart.products);

//     return res.status(200).send({
//       status: 'success',
//       message: `The cart with ID: ${cid} was emptied correctly`,
//       cart: cart,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: 'An error occurred while processing the request' });
//   }
// });

export default router