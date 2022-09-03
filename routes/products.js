const express = require('express');
const { getProducts, createProduct, getProductsByUserId, getProductById, deleteProduct } = require('../dao/products');
const { auth } = require('../middlewares/auth');
const { getUserById } = require('../dao/users');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  if (user.role !== 'admin') {
    res.status(403).send({ message: 'Only admin can get all products' });
    return;
  }
  const results = await getProducts();
  res.send({ product: results });
});

router.post('/', auth, async (req, res) => {
  const { name, price, category } = req.body;
  const id = await createProduct(name, price, category, req.user.id);
  res.send({ product: { id, name, price, category } });
});

// GET /products/me
router.get('/me', auth, async (req, res) => {
  const userId = req.user.id;
  const products = await getProductsByUserId(userId);
  res.send({ products });
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  if (!product) {
    res.status(404).send({ message: 'Product not found' });
    return;
  }
  res.send({ product });
});

router.delete('/:productId', auth, async (req, res) => {
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
});

module.exports = router;