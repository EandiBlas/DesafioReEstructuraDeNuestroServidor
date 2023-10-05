import CartService from "../services/cart.services.js";

class CartsController {
    constructor() {
        this.service = new CartService();
    }

    createCart = async (req, res) => {
        try {
            const { products } = req.body;
            if (!Array.isArray(products)) {
                return res.status(400).send('Invalid request: products must be an array');
            }
            const cart = await this.service.createCart(products);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error.message);
        }
    };

    getCartById = async (req, res) => {
        try {
            const cart = await this.service.getCart(req.params.cid);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getAllCarts = async (req, res) => {
        try {
            const cart = await this.service.getCarts(req.body);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    updateProductQuantityInCart = async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
      
        try {
          const result = await this.service.updateProductQuantityInCart(cid, pid, quantity);
          res.json(result);
        } catch (error) {
          res.status(500).json({ error: error.toString() });
        }
    };


    updateProductList = async (req, res) => {
        const { cid, pid, quantity } = req.body;
    
        try {
            const updatedCart = await this.service.updateProductList(cid, pid, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const checkIdProduct = await pm.getProductById(pid);
            if (!checkIdProduct) {
              return res.status(404).send({ message: `Product with ID: ${pid} not found` });
            }
        
            const checkIdCart = await cm.getCartById(cid);
            if (!checkIdCart) {
              return res.status(404).send({ message: `Cart with ID: ${cid} not found` });
            }
        
            const result = await cm.addProductInCart(cid, { _id: pid, quantity: quantity });
            console.log(result);
            return res.status(200).send({
              message: `Product with ID: ${pid} added to cart with ID: ${cid}`,
              cart: result,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default CartsController