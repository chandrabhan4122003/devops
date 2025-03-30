import React from 'react'
import Navbar from '../ui/Navbar'
import samba from "../assets/samba.png"
import style from "../style/Home.module.css"
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
        <img src = {samba} style={{
            position:"absolute",
            top:"25%",
            left:"30%",
            zIndex:"1"
        }}/>
        <div style={{
            marginTop: "4rem"
        }}>
            <ProductsList/>
        </div>
    </div>
  )
}

export default Home
