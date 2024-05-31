import Footercomp from "../../components/footercomp";
import Headercomp from "../../components/headercomp";
import Productviewcomp from "../../components/products/productsviewcomp";
import Loginpage from "../loginpage";

export default function Productspage({logged,setlogged}) {
  
    if(!logged){
        return(
        <Loginpage setlogged={setlogged}/>
        )  }

    return (<>
        <Headercomp />
        <div className="body">
            <h3>Product Page</h3>
            <Productviewcomp />
        </div>
        <Footercomp/>
        </>

    )
}