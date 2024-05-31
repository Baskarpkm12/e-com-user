import { useEffect, useState } from "react"
import Headercomp from "../components/headercomp"
import Loginpage from "./loginpage";
import loader from "../assets/loading-white.gif"
import axios, { Axios } from "axios";
import {Link, useNavigate} from "react-router-dom"
import image from "../assets/logo.jpg"
const api_url=import.meta.env.VITE_API_URL;
export default function Cartpage({ logged, setlogged }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setcart] = useState([]);
    const [count, setcount] = useState(1)
    let name = sessionStorage.getItem("username");

    const fetchdata = async () => {
        axios.get(`${api_url}/users/login/${name}`)
            .then(async Response2 => {
                let data = await Response2.data.data[0].cart;
                console.log("cart items:", data)
                setcart(data);
                setLoading(false)
                console.log("cart",cart)
            });
    }

    useEffect(() => {
        fetchdata();
    }, [])

    if (!logged) {
        return (
            <Loginpage setlogged={setlogged} />
        )
    }
    if (loading) {
        return (<div style={{ display: "grid", placeContent: "center", height: "300px", width: "100%" }}><img src={loader} style={{ width: "200px" }} /></div>)
    }
    // post 
    async function postcart(totalitems) {
        let results = {
            "username": name,
            "cart": totalitems,
        }
        await axios.put(`${api_url}/users/update`, results)
            .then(async Response3 => {
                console.log(Response3.data);
            });
    }

    const increase = (i) => {
        let newcart = cart.map((v, index) => {
            if (index == i) {
                v.__v += 1;
                return v;
            }
            return v;
        })
        setcart(newcart);
        postcart(newcart);
    }

const decrease = (i) => {
    let newcart = cart.map((v, index) => {
        if (index == i) {
            v.__v = (v.__v > 1) ? v.__v - 1 : 1;
            return v;
        }
        return v;
    })
    setcart(newcart)
    postcart(newcart)
}

const deletecart = (i) => {
    let ok = confirm("are you delete ?")
    if (ok) {
        let newcart = cart.filter((v, index) => {
            return i !== index
        })
        setcart(newcart);
        postcart(newcart)
    }
}

return (
    <>
        <Headercomp />
        <div className="container mt-5 mb-5 cart-page">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Shopping cart</h4>
                    </div>
                    {cart.length == 0?(<><h1>No items in your cart</h1><p><Link to="/products" style={{color:"#018",textDecoration:"underline",fontWeight:"bolder"}}>👉go to Shopping</Link> </p></>):""}                     
                    {cart.map((v, i) => {
                        return (
                            <div key={i} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                                <div className="mr-1"><img className="rounded" src={image} width="100" alt="" /></div>
                                <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{v.p_name}</span>
                                    <div className="d-flex flex-row product-desc">
                                        <div className="size mr-1"><span className="text-grey">prize:</span><span className="font-weight-bold">&nbsp;{v.p_prize}</span></div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center qty"><i className="fa fa-minus text-danger" onClick={() => { decrease(i) }}></i>
                                    <h5 className="text-grey mt-1 mr-1 ml-1">{v.__v}</h5><i className="fa fa-plus text-success" onClick={() => { increase(i) }}></i></div>
                                <div>
                                    <h5 className="text-grey">TOTAL RS:{v.__v * v.p_prize}</h5>
                                </div>
                                <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger" onClick={() => { deletecart(i) }}></i></div>
                            </div>
                        );

                    })}

                    {(cart.length !== 0)?(<div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" onClick={()=>{navigate("/confirm-order")}}>Confirm Order</button></div>
                    ):("")}
                            </div>
                            
            </div>
        </div>
    </>

)
}