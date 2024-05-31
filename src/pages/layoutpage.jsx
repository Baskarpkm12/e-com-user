import { Outlet } from "react-router-dom";
import Footercomp from "../components/footercomp";
import Headercomp from "../components/headercomp";
import Loginpage from "./loginpage";
import { useState } from "react";
import Forgotpage from './forgotpage';
import { BrowserRouter , Routes  , Route  } from "react-router-dom";
export default function Layoutpaging(){
  


  if(logged){
    return(
      <>
        <Headercomp setlogged={setlogged}/>
       
      </>
  )
  }

}