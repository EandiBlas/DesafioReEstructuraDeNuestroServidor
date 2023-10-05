import ProductManager from "../dao/managers/productManagerMongo.js";

class ProductService {

    constructor() {
        this.product = new ProductManager();
    }

    addProduct = async (product) => {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.category || !product.stock || !product.code) {
            return "Faltan campos por completar"
        } 
        const verifyCode = await this.product.getProductByCode(product.code)
        if (verifyCode) {
            return "El codigo se repite"
        }
        return await this.product.addProduct(product);
    };

    getProduct = async (id) => {
        const product = await this.product.getProductById(id);
        const newProduct = { id: product._id, title: product.title, description: product.description, price: product.price, stock: product.stock, thumbnail: product.thumbnail, category: product.category }
        return newProduct;
    }

    getAllProducts = async () => {
        const products = await this.product.getProducts();
        return products;
    };

    updateProduct = async (id, product) => {
        const updateProduct = await this.product.updateProduct(id, product);
        return updateProduct;
    };

    deleteProduct = async (id) => {
        const deleteProduct = await this.product.deleteProduct(id);
        if (deleteProduct) {
            return 'Producto Eliminado';
        } else {
            return 'Producto no encontrado';
        }
    };

}

export default ProductService