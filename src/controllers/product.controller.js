import ProductService from "../services/product.services.js";

class ProductController{
    constructor(){
        this.service = new ProductService();
    }

    addProduct = async (req, res) => {
        try {
            const addProduct = await this.service.addProduct(req.body);
            res.status(200).json(addProduct);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    };
    
    getProduct = async (req, res) => {
        try{
            const product = await this.service.getProduct(req.params.pid);
            res.status(200).json(product);
        }catch(error){
            res.status(500).json(error);
        }
    }

    getAllProducts = async (req, res) => {
        try{
            const products = await this.service.getAllProducts();
            res.status(200).json(products);
        }catch(error){
            console.log(error)
            res.status(500).json(error);
        }
    }


    updateProduct = async (req, res) => {
        try {
            const updateProduct = await this.service.updateProduct(req.params.pid, req.body);
            res.status(200).json(updateProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    deleteProduct = async (req, res) => { 
        try {
            const deleteProduct = await this.service.deleteProduct(req.params.pid);
            res.status(200).json(deleteProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default ProductController