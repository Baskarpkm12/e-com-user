import axios from "axios";
import logo from "../assets/logo.jpg"
import { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Loginpage from "./loginpage";
const api_url=import.meta.env.VITE_API_URL;   

export default function Forgotpage({logged,setlogged}){
    const navigate = useNavigate();
const[oldname,setoldname] = useState('')
const [username,setusername]=useState("");
const [oldpassword,setoldpassword]=useState(0)
const [password,setpassword]=useState(0);
const [newpassword,setnewpassword] = useState(0)

const [errmsg,seterrmsg]=useState("");
const [successmsg,setsuccessmsg]=useState("");
 
 useEffect(()=>{
    axios.get(`${api_url}/users/login/${username}`)
    .then(Response=>{
        // console.log(Response.data);
        if(Response.data.data.length > 0){
            let results = Response.data.data[0];
            setoldname(results.username);

            setoldpassword(results.password);

        }
    }),[]
 })
    const changepassword =()=>{
        // let result ={
        //     "name":username,
        //     "password":password,
        // }
        let result = {
            "username":username,
            "password":newpassword,
        }
       
        console.log(oldname,username)
        if(oldname==username){
            if(oldpassword==password){
                
       
                axios.put(`${api_url}/users/update`,result)
                .then(Response=>{
                console.log(Response.data);
                if(Response.data.error!="")(seterrmsg(Response.data.error),setsuccessmsg(""))
                else(Response.data.msg!="")
                alert(Response.data.msg);
                navigate("/");


                
        })
            }
            else{
                seterrmsg("incorrect password")
            }
        }
        else{
            seterrmsg("user not found")
        }
    
    }
    if(!logged){
        return(
        <Loginpage setlogged={setlogged}/>
        )  }

    return(
        <>
        <div className="box">
        <div className="imageContainer flexCenter">
            <img className="circleframe" src={logo} alt="profile"/>
            <h3>change password</h3>
        </div>
        <div className="content">
            <p>{errmsg}{successmsg}</p>
            <input className="textField" type="text" placeholder="Username" name="username" onChange={(e)=>setusername(e.target.value)}/>
            <input className="textField" type="password" placeholder="old Password" name="old password" onChange={(e)=>setpassword(e.target.value)} />
            <input className="textField" type="password" placeholder="new Password" name="password" onChange={(e)=>setnewpassword(e.target.value)} />
            <button className="primaryBtn" onClick={changepassword}>Change</button>
            <NavLink to="/">Back</NavLink>
        </div>
        </div>
        </>
    )
}