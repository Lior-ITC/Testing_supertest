const express = require('express');
const { createNewProduct, getAllProducts, getProductByUser, getProductByProductId, deleteProductById } = require('../controllers/products');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, getAllProducts);

router.post('/', auth, createNewProduct);

// GET /products/me
router.get('/me', auth, getProductByUser);

router.get('/:id', auth, getProductByProductId);

router.delete('/:productId', auth, deleteProductById);

module.exports = router;