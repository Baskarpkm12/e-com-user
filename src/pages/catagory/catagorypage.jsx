import Catagoryviewcomp from "../../components/catagory/catagoryviewcomp";
import Footercomp from "../../components/footercomp";
import Headercomp from "../../components/headercomp";
import Loginpage from "../loginpage";

export default function Catagorypage({logged,setlogged}){
    if(!logged){
        return(
        
        <Loginpage setlogged={setlogged}/>
        )  }

     
    return(
        <>
        <Headercomp />
        <div className="body">
            Catagory-Page
            <Catagoryviewcomp/>
        </div>
        <Footercomp/>
        </>
        
    )
}