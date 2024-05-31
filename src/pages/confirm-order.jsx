import axios from "axios";
import logo from "../assets/logo.jpg";
import { useEffect, useState} from "react";
const api_url=import.meta.env.VITE_API_URL;
export default function Confirmorderpage(){
    const [user,setuser]=useState([]);
    const [loading,setloading]=useState(true);
    const fetchdata = async () => {
        const name = sessionStorage.getItem("username");
        await axios.get(`${api_url}/users/login/${name}`)
        .then(async Response => {
                let data =await Response.data.data[0].cart;
                // console.log(data);
                await setuser(data);
                console.log(user);
                setTimeout(()=>{setloading(false)},5000)
                
            });
    }

    useEffect(() => {
 fetchdata();
    },[]);
const totalfun=()=>{
    let sum = 0;
 
// Calculation the sum using forEach
user.forEach( v => {
    sum +=(v.__v * v.p_prize) ;
});
 return sum;
}
if(loading){return <div style={{display:"grid",width:"100%",height:"100vh",placeContent:"center"}}><h1>loading</h1></div>}
    return(
        <>
                <div className="confirm-order">
                        <h1>Confirm Order</h1>
                    <div className="shipping-info">
                        <h2>Shipping info</h2>
                        <input type="text" placeholder="Enter your name"/><br/><br/>
                        <input type="text" placeholder="Door,street name" /><br/><br/>
                        <input type="text" placeholder="Enter village" /><br/><br/>
                        <input type="text" placeholder="Enter city" /><br/><br/>
                        <input type="number" placeholder="Enter phone number" /><br/><br/>
                        <input type="text" placeholder="Enter pincode"/>
                    </div>
                        <h2>Order Items</h2>
                    { user.map((v,i)=>{
                     return(  
                    <div className="order-items" key={i}>
                        <img src={logo} alt="img" style={{width:"50px", height:"50px"}}/>
                        <p>{v.p_name}</p>
                        <p>{v.__v}*{v.p_prize} = ₨.{v.__v *v.p_prize}</p>
                    </div>
                    
             )})} 
                     <h3 className="total">Total = ₨.{ totalfun()} </h3>
                     <div className="btns">
                     <button className="btn" onClick={()=>{window.location.pathname="/cart"}}>Go Back</button>
                     <button className="pay" >Proceed to PAY</button>
                     </div>
                </div>           
        </>         
    )
}                    