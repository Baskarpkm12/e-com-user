import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import loader from "../../assets/loading-white.gif"

export default function Catagoryviewcomp() {
    const [loading,setLoading]=useState(true);
    const [products, setproducts] = useState([]);
    const navigate = useNavigate();

    const fetchdata = () => {
        axios.get('https://projectbackend-rosy.vercel.app/catagory/read')
            .then(Response => {
                let result = Response.data
                console.log(result);
                setproducts(result.data);
                setLoading(false)
            })
           
    }

    useEffect(() => {
        fetchdata();
    }, [])
    if(loading){
        return(<div style={{display:"grid",placeContent:"center",height:"300px",width:"100%"}}><img src={loader} style={{width:"200px"}}/></div>)
      }
    return (
        <>
            <div className="d-flex align-content-around flex-wrap row mx-5">
                {
                    products?.map((v, i) => {
                        return (
                            <div key={i} className="card col-lg-2  my-3 mx-3">
                                <img className="card-img-top" src="holder.js/100px180" />
                                <div className="card-body">
                                    <h2 className="card-title">{v.ctg_name}</h2>
                                    <p className="card-text">Total products : {v.products} </p>
                                    <p className="card-text">from : {v.ctg_location} </p>
                                    <a href="#" class="btn btn-primary">view</a>                         
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </>
    )
}