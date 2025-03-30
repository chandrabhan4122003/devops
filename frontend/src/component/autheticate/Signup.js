import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import nike from '../assets/nike.png';
import style from '../style/Auth.module.css';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(email, password, role.toLowerCase());
    };

    const registerUser = async (email, password, role) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    role,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                console.log('Signup successful:', data);
                navigate('/');
            } else {
                console.error('Signup failed:', data.message);
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.left}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <h1>SIGN UP</h1>
                        <span style={{ fontSize: '13px', color: '#333' }}>
                            Please enter your details to create an account
                        </span>
                    </div>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    marginBottom: '8px',
                                    display: 'block',
                                }}
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    marginBottom: '8px',
                                    display: 'block',
                                }}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="role"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    marginBottom: '8px',
                                    display: 'block',
                                }}
                            >
                                Role
                            </label>
                            <div
                                className={style.dropdown}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <div>{role}</div>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.ul
                                            className={style.dropdownMenu}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                width: '100%',
                                                backgroundColor: '#fff',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                zIndex: 10,
                                                listStyle: 'none',
                                                padding: '8px 0',
                                            }}
                                        >
                                            {['user', 'admin'].map((item) => (
                                                <motion.li
                                                    key={item}
                                                    onClick={() => {
                                                        setRole(item);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div>
                            <input
                                type="submit"
                                value="Sign up"
                                style={{ backgroundColor: '#EA454C', color: '#FFF' }}
                            />
                        </div>
                        <div className={style.signup}>
                            <span>
                                Already have an account?
                                <span style={{ color: '#d63c43' }}>
                                    {' '}
                                    <Link to={'/'}>
                                        <b>Log in!</b>
                                    </Link>
                                </span>
                            </span>
                        </div>
                    </form>
                </div>
                <div className={style.right}>
                    <img src={nike} alt="Nike Logo" />
                </div>
            </div>
        </div>
    );
};

export default Signup;