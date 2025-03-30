import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import style from '../style/Admin.module.css';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const role = localStorage.getItem('role');
      if (role !== 'admin') {
        navigate('/'); 
      }
    }, [navigate]);

    const [activeSection, setActiveSection] = useState('form');

    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <div
                    className={`${style.sidebarItem} ${activeSection === 'form' ? style.active : ''}`}
                    onClick={() => setActiveSection('form')}
                >
                    Add Product
                </div>
                <div
                    className={`${style.sidebarItem} ${activeSection === 'list' ? style.active : ''}`}
                    onClick={() => setActiveSection('list')}
                >
                    List of Products
                </div>
                <div className={style.header}>
                    <div
                        className={style.backButton}
                        onClick={() => navigate('/home')}
                    >   
                        <FontAwesomeIcon icon={faHouse} style={{color:"#000"}}/>
                    </div>
                </div>
            </div>

            <div className={style.mainContent}>
                {activeSection === 'form' && <Form />}
                {activeSection === 'list' && <List />}
            </div>
        </div>
    );
};

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        image: null,
        rating: 0,
        gender: '',
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        createProduct();
        setFormData({
            name: '',
            description: '',
            category: '',
            price: 0,
            image: null,
            rating: 0,
            gender: '',
        });
    };

    const createProduct = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("rating", formData.rating);
        formDataToSend.append("gender", formData.gender);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin/create`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formDataToSend,
            });
            if (response.ok) alert('Product created successfully');
            else console.log('Error creating product');
        } catch (err) {
            console.log('Error: ', err);
        }
    };

    return (
        <div className={style.formContainer}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label htmlFor="name">Product's Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="description">Product's Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="category">Product's Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="price">Product's Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="image">Product's Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="rating">Product's Rating</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                rating: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="gender">Gender</label>
                    <div
                        className={style.dropdown}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className={style.dropdownSelected}>
                            {formData.gender || 'Select Gender'}
                        </div>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    className={style.dropdownMenu}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {['Male', 'Female', 'Unisex'].map((gender) => (
                                        <li
                                            key={gender}
                                            className={style.dropdownItem}
                                            onClick={() => {
                                                setFormData({ ...formData, gender });
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {gender}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className={style.formGroup}>
                    <input type="submit" value="Submit" className={style.submitButton} />
                </div>
            </form>
        </div>
    );
};

const List = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setProducts(data);
                setFilteredProducts(data);
            } else {
                console.error('Error fetching products:', data.message);
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            product.price.toString().includes(term)
        );
        setFilteredProducts(filtered);
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin/${id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                console.log('Product deleted successfully');
                fetchProducts();
            } else {
                console.error('Error deleting product');
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };

    // Update a product
    const updateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin/${updatedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedProduct),
            });
            if (response.ok) {
                console.log('Product updated successfully');
                setEditingProduct(null);
                fetchProducts();
            } else {
                console.error('Error updating product');
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateProduct(editingProduct);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={style.listContainer}>
            <h2>List of Products</h2>
            <div className={style.searchBar}>
                <input
                    type="text"
                    placeholder="Search by name, category, or price..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={style.searchInput}
                />
            </div>

            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <button
                                    className={style.editButton}
                                    onClick={() => setEditingProduct(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={style.deleteButton}
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingProduct && (
                <div className={style.overlay}>
                    <div className={style.overlayContent}>
                        <h3>Edit Product</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className={style.formGroup}>
                                <label htmlFor="editName">Name</label>
                                <input
                                    type="text"
                                    id="editName"
                                    value={editingProduct.name}
                                    onChange={(e) =>
                                        setEditingProduct({ ...editingProduct, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="editCategory">Category</label>
                                <input
                                    type="text"
                                    id="editCategory"
                                    value={editingProduct.category}
                                    onChange={(e) =>
                                        setEditingProduct({ ...editingProduct, category: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="editPrice">Price</label>
                                <input
                                    type="number"
                                    id="editPrice"
                                    value={editingProduct.price}
                                    onChange={(e) =>
                                        setEditingProduct({ ...editingProduct, price: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="editGender">Gender</label>
                                <select
                                    id="editGender"
                                    value={editingProduct.gender}
                                    onChange={(e) =>
                                        setEditingProduct({ ...editingProduct, gender: e.target.value })
                                    }
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>
                            <div className={style.formGroup}>
                                <button type="submit" className={style.submitButton}>
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className={style.cancelButton}
                                    onClick={() => setEditingProduct(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;