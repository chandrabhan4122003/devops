const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const { createProduct, getProducts, updateProduct, deleteProduct, searchFilter } = require('../controllers/productController.js');
const { authMiddleware, adminMiddleware} = require('../middleware/authMiddleware');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/create', authMiddleware, adminMiddleware, upload.single('image'), createProduct);
router.get('/', getProducts);
router.get('/search', searchFilter);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;