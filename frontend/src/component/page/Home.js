import React from 'react'
import Navbar from '../ui/Navbar'
import samba from "../assets/samba.png"
import style from "../style/Home.module.css"
import { motion } from 'framer-motion'
import ProductsList from './ProductsList'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className={style.hero}>
            <div className={style.right}/>
            <div className={style.text}>
                <div>
                    <span>
                        Samba OG Shoes
                    </span>
                </div>
                <div>
                    <span style={{
                        fontSize: "2rem",
                        fontWeight: "600",
                    }}>₹10 999</span>
                </div>
                <div>
                    <button className={style.btn}>Buy Now</button>
                </div>
            </div>
            <div className={style.left}>
                <div>
                    <span>BOLD LOOK.</span>
                </div>
                <div>
                    <span>BOLD COLORS.</span>
                </div>
            </div>
        </div>
        <motion.div 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
            position:"absolute",
            top:"25%",
            left:"30%",
            zIndex:"1"
        }}>
            <img src = {samba} />
        </motion.div>
        <div style={{
            marginTop: "4rem"
        }}>
        <div>
            <ProductsList/>
        </div>
        </div>
    </div>
  )
}

export default Home
