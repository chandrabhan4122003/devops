import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import style from '../style/ProductsList.module.css';

const ProductsList = () => {
    const [products, setProducts] = useState([]); 
    const [maxPrice, setMaxPrice] = useState(10000); 
    const [useFilter, setUseFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState("All");
    const tabs = ["All", "Male", "Female", "Unisex"];

    const fetchProducts = async () => {
        try {
            let query = `?maxPrice=${maxPrice}`;
            query += `&gender=${selectedTab !== "All" ? selectedTab : ""}`;
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin/search${query}`);
            const data = await response.json();
            if (response.ok) {
                setProducts(data);
            } else {
                console.error('Error fetching products:', data.message);
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };

    const handlePriceChange = (value) => {
        setMaxPrice(value);
    };

    const handleToggleFilter = () => {
        setUseFilter(!useFilter);
    };

    useEffect(() => {
        fetchProducts();
    }, [useFilter, maxPrice, selectedTab]);
    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <h3>Filter by Price</h3>
                <div className={style.toggleFilter}>
                    <label>
                        <input
                            type="checkbox"
                            checked={useFilter}
                            onChange={handleToggleFilter}
                        />
                        Enable Price Filter
                    </label>
                </div>
                {useFilter && (
                    <>
                        <motion.input
                            type="range"
                            min="0"
                            max="20000"
                            value={maxPrice}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            className={style.slider}
                        />
                        <div className={style.priceLabel}>Max Price: ₹{maxPrice}</div>
                    </>
                )}
                <ul className={style.navTabs}>
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={`${style.tab} ${selectedTab === tab ? style.active : ''}`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                            {selectedTab === tab && (
                                <motion.div
                                    className={style.underline}
                                    layoutId="underline"
                                    initial={{ width: "0%" }}
                                    animate={{ width: '100%' }}
                                    transition={{ ease: [0.76, 0, 0.24, 1] }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Products Grid */}
            <div className={style.productsGrid}>
                {products.map((product) => (
                    <div key={product._id} className={style.productCard}>
                        <img src={`${process.env.REACT_APP_API_BASE_URL}${product.image}`} alt={product.name} className={style.productImage} />
                        <div className={style.productDetails}>
                            <h4>{product.name}</h4>
                            <p>{product.category}</p>
                            <p>₹{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;