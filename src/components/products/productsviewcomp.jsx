import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import image from "../../assets/logo.jpg";
import loader from "../../assets/loading-white.gif"
const api_url=import.meta.env.VITE_API_URL;
export default function Productviewcomp({ logged }) {
    const [loading, setLoading] = useState(true);
    const [products, setproducts] = useState();


    const [errmsg, seterrmsg] = useState("");
    const [successmsg, setsuccessmsg] = useState("");
    // const navigate = useNavigate();
    let name = sessionStorage.getItem("username");
    const fetchdata = () => {
        axios.get(`${api_url}/product/read`)
            .then(Response => {
                let result = Response.data
                console.log(result);
                setproducts(result.data);
                setLoading(false)
            })

    }
    useEffect(() => {
        fetchdata();
        alert("this is not paid server so can't retrive image data..")
    }, [])

    if (loading) {
        return (<div style={{ display: "grid", placeContent: "center", height: "300px", width: "100%" }}><img src={loader} style={{ width: "200px" }} /></div>)
    }

    const addtocart = async (id) => {
        setLoading(true);
        // get specific product
        await getspecific();
        async function getspecific() {
            await axios.get(`${api_url}/product/readspesific/${id}`)
                .then(async Response1 => {
                    let result = await Response1.data.data[0];
                    await getusercart(result);
                });
        }
        // get user cart
        async function getusercart(cart) {
            await axios.get(`${api_url}/users/login/${name}`)
                .then(async Response2 => {
                //    console.log("user :",Response2.data.data[0])
                    // console.log(Response2.data.data[0]);
                    let data = await Response2.data.data[0];
                    cart.__v +=1;
                    let totalitems = await [ ...data.cart , cart]; //[null,{}] 
                    postcart(totalitems);
                }); 
        }
        // post cart
        async function postcart(totalitems) {
            let results = {
                "username": name,
                "cart": totalitems,

            }
            await axios.put(`${api_url}/users/update`, results)
                .then(async Response3 => {
                    // console.log(Response3.data);
                    if (Response3.data.error != "")
                        // (seterrmsg(false), setsuccessmsg("successfully added to cart!"))
                    seterrmsg("Cart Item Added Successfully!")
                    else (Response3.data.msg != "")
                    // alert("cart item added sucessfully!");
                    // navigate("/users");
                });
        setLoading(false);
            }
    }

    return (
        <div className="product-page">
           <div className="row" >
                {errmsg?(
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong className="text-success">{errmsg}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="close" onClick={()=>{seterrmsg("")}}></button>
                </div>
                ):""}
                
                {

                    products?.map((v, i) => {
                        return (
                            <div key={i} className="card">
                                <img className="card-img-top" src={image} />
                                <div className="card-body">
                                    <h4 className="card-title">{v.p_name}</h4>
                                    <p className="card-text" style={{ color: "green" }}>Prize : ₨.{v.p_prize} </p>
                                    {/* <p className="card-text">Quantity : {v.p_qty} </p>
                                    <p className="card-text"> catagory : {v.ctg_id} </p> */}
                                    {/* <td>{v.p_location}</td>
                                        <td>{v.totalsale}</td>
                                         <td>{v.vendor_id}</td> */}
                                        
                                    <p className="btn btn-primary" onClick={() => { addtocart(v._id) }}>Add to cart</p>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}