import axios from "axios";
import logo from "../assets/logo.jpg";
import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
const api_url=import.meta.env.VITE_API_URL;   

export default function Loginpage({setlogged}){
    const navigate = useNavigate();
    
const [username,setusername]=useState("");
const [password,setpassword]=useState(0);

const [errmsg,seterrmsg]=useState("");
const [successmsg,setsuccessmsg]=useState("");

const loginprocess =()=>{
    
    let result ={
        "username":username,
        "password":password,
    }
    axios.get(`${api_url}/users/login/${result.username}`)
    .then(Response=>{
        console.log(Response.data.data[0]);
        if(Response.data.data.length > 0){
            if(Response.data.data[0].password == result.password){
                sessionStorage.setItem("username",username);
                sessionStorage.setItem("logged",true);
                setlogged(sessionStorage.getItem("logged"));
                // alert(sessionStorage.getItem("username"));    // setlogged(true);
            }
            else{
                seterrmsg("incorrect password!")
                setsuccessmsg('')
            }
            } 
        else{
            setsuccessmsg('please register')
            seterrmsg('')
        }
    })
}
const registerprocess =()=>{
    
    let result ={
        "username":username,
        "password":password,
    }
    axios.get(`${api_url}/users/login/${result.username}`)
    .then(Response=>{
        console.log(Response.data.data[0]);
        if(Response.data.data.length > 0){
            setsuccessmsg('user already existed')
            seterrmsg("")
            } 
        else{
            
            axios.post(`${api_url}/users/add`,result)
            .then(Response=>{
                console.log(Response.data);
                if(Response.data.error!="")(seterrmsg(Response.data.error))
                else(Response.data.msg!="")
                    sessionStorage.setItem("username",username);
                    sessionStorage.setItem("logged",true);
                    setlogged(sessionStorage.getItem("logged"));
                    // alert(Response.data.msg);
                    // alert(sessionStorage.getItem("username"))
                    // sessionStorage.setItem("username",username);
                    // alert(sessionStorage.getItem("username"));
            })
            
        }
    })
}

    return(
        <>
        <div className="box">
        <div className="imageContainer flexCenter">
            <img className="circleframe" src={logo} alt="profile"/>
            <h3>Login</h3>
        </div>
        <div className="content">
            <p>{errmsg}{successmsg}</p>
            <input className="textField" type="text" placeholder="Email/Username" name="username" onChange={(e)=>setusername(e.target.value)}/>
            <input className="textField" type="password" placeholder="Password" name="password" onChange={(e)=>setpassword(e.target.value)} />
            <button className="primaryBtn" onClick={loginprocess}>Sign in</button>
            <button className="primaryBtn" onClick={registerprocess}>register here</button>
            <span onClick={()=>{navigate("/change-password")}} >change password?</span>
            {/* <Link to="/change-password">Change password</Link> */}
        </div>
        </div>
        </>
    )
}