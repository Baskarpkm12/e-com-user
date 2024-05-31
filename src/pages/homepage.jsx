import { useEffect, useState } from 'react'
import Headercomp from '../components/headercomp'
import Footercomp from '../components/footercomp'
import Loginpage from './loginpage'

export default function Homepage({setlogged,logged}){
  let name=sessionStorage.getItem("username");
  if(!logged){
    return(
    <Loginpage setlogged={setlogged}/>
    )  }
  return(
    <>
    <Headercomp setlogged={setlogged}/>
        <div className="bodyy">
          
          <h4>{name}</h4>
          <div className='welcome'>
<h1>welcome</h1><h1>Shopping Page</h1></div>
        </div>
    <Footercomp/>
        </>)
}