const { getProducts, createProduct, getProductsByUserId, getProductById, deleteProduct } = require('../model/products');
const { getUserById } = require('../model/users');

async function getAllProducts(req, res) {
    const userId = req.user.id;
    const user = await getUserById(userId);
    if (user.role !== 'admin') {
        res.status(403).send({ message: 'Only admin can get all products' });
        return;
    }
    const results = await getProducts();
    res.send({ product: results });
}

async function createNewProduct (req, res){
    const { name, price, category } = req.body;
    const id = await createProduct(name, price, category, req.user.id);
    res.send({ product: { id, name, price, category } });
  }

  async function getProductByUser(req, res) {
    const userId = req.user.id;
    const products = await getProductsByUserId(userId);
    res.send({ products });
  }

  async function getProductByProductId(req, res) {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      res.status(404).send({ message: 'Product not found' });
      return;
    }
    res.send({ product });
  }

  async function deleteProductById(req, res) {
    const userId = req.user.id;
    const { productId } = req.params;
    const product = await getProductById(productId);
    const user = await getUserById(userId);
    const canDeleteProduct = product.userId === userId || user.role === 'admin';
    if (!canDeleteProduct) {
      res.status(403).send({ message: 'Only product creator can delete' });
      return;
    }
    await deleteProduct(productId);
    res.send({ message: 'deleted successfully' });
  }

module.exports = { getAllProducts,createNewProduct, getProductByUser, getProductByProductId, deleteProductById }