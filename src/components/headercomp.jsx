import axios, { Axios } from "axios";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useEffect, useState } from "react";
const api_url=import.meta.env.VITE_API_URL;
export default function Headercomp({setlogged}){
    const [len,setLen] =useState(0);
const name=sessionStorage.getItem("username");

    const fetchdata = async () => {
        axios.get(`${api_url}/users/login/${name}`)
            .then(async Response2 => {
                let data = await Response2.data.data[0].cart;
                setLen(data.length);
            });
    }

    useEffect(() => {
        fetchdata();
    }, [])

    return(
        <>
       <div className="menu">
            <div className="logo">
                <img src={logo}></img>
            </div>
            <div>
                <nav className="menubar">
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/products">products</NavLink></li>
                        {/* <li><NavLink to="/catagory">catagory</NavLink></li> */}
                        <li><NavLink to="/cart">cart .
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg></NavLink>
                        </li>
                        <li><NavLink to="/logout">logout</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div className="cart-count">
            <h6>{len}</h6>
        </div>
        </>
    )
}
