const Product = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, rating, gender } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !description || !category || !price || !gender || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await Product.create({
            name,
            description,
            category,
            price,
            image,
            rating,
            gender,
        });

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating product' });
    }
};

const getProducts = async (req,res) => {
    const products = await Product.find({});
    res.status(200).json(products);
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price, gender } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedFields = {
            name,
            description,
            category,
            price,
            gender,
        };

        if (image) {
            updatedFields.image = image;
        }

        const product = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating product' });
    }
};

const deleteProduct = async (req,res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
}

const searchFilter = async (req,res) => {
    const {category, minPrice, maxPrice, rating, search, gender} = req.query;
    let query = {};
    if(gender){
        query.gender = gender;
    }
    if(category) {
        query.category = category;
    }
    if(minPrice) {
        query.price = { $gte: minPrice };
    }
    if(maxPrice) {
        query.price = { ...query.price, $lte: maxPrice };
    }
    if(rating) {
        query.rating = { $gte: rating };
    }
    if(search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } }, 
            { description: { $regex: search, $options: "i" } }
        ];
    }
    const products = await Product.find(query);
    res.status(200).json(products);
}

module.exports = { 
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    searchFilter,
};