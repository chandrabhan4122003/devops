import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import nike from '../assets/nike.png';
import style from '../style/Auth.module.css';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(email, password);
    }

    const registerUser = async (email, password) => {
        try{
            const response = await fetch(`http://localhost:5000/api/auth/signup`, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json();
            if(response.ok) console.log(data);
        }catch(err){
            console.log("error: ", err.message)
        }
    }

    return (
        <div className={style.container}>
          <div className={style.card}>
            <div className={style.left}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
                    <h1>SIGN UP</h1>
                    <span style={{fontSize:"13px", color:"#333"}}>Please enter your details to create an account</span>
                </div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '8px',
                            display: 'block'
                        }}>Email</label>
                        <input type="text" id="email" placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '8px',
                            display: 'block'
                        }}>Password</label>
                        <input type="password" id="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
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
                            <span style={{color:"#d63c43"}}> <Link to={'/'}><b>Log in!</b></Link></span>
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

export default Signup
