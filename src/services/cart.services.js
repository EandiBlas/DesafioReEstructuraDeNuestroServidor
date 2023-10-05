import CartManager from "../dao/managers/cartManagerMongo.js";
import ProductManager from "../dao/managers/productManagerMongo.js";


class CartService {

  constructor() {
    this.cart = new CartManager();
    this.product = new ProductManager();
  }

  createCart = async (products) => {
    let cartData = {};
    const validProducts = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const checkId = await this.product.getProductById(product._id);
      if (checkId === null) {
        throw new Error(`Product with ID ${product._id} does not exist`);
      }
      validProducts.push(product);
    }
    cartData.products = validProducts;
    return await this.cart.addCart(cartData)
  };

  getCart = async (id) => {
    const cart = await this.cart.getCartById(id);
    return cart;
  }

  getCarts = async () => {
    const carts = await this.cart.getCarts();
    return carts;
  };

  updateProductQuantityInCart = async (cid, pid, quantity) => {
    const cart = await this.cart.getCartById(cid);
    const products = cart.products;
    const checkId = await this.product.getProductById(pid);
    if (checkId === null) {
      throw new Error(`Product with ID ${pid} does not exist`);
    }
    const productIndex = products.findIndex(product => product._id == pid);
    if (productIndex !== -1) {
      products[productIndex].quantity += quantity;
    } else {
      products.push({ _id: pid, quantity });
    }
    const updatedCart = await this.cart.updateProductsInCart(cid, products);

    return updatedCart;
  };

  updateProductList = async (cid, pid, quantity) => {
    try {
        const cart = await this.cart.getCartById(cid);

        const productIndex = cart.products.findIndex((product) => product._id === pid);

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }
        } else if (quantity > 0) {
            cart.products.push({ _id: pid, quantity });
        }

        return await cart.save();
    } catch (error) {
        throw error;
    }
  };


}

export default CartService