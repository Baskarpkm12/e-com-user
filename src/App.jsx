import { BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage'
import Productspage from './pages/products/productspage'
import Catagorypage from './pages/catagory/catagorypage'
import Layoutpaging from './pages/layoutpage'
import Headercomp from './components/headercomp'
import Footercomp from './components/footercomp'
import { useState } from 'react'
import Forgotpage from './pages/forgotpage'
import Loginpage from './pages/loginpage'
import Cartpage from './pages/cartpage'
import Paymentpage from './pages/confirm-order'
import Confirmorderpage from './pages/confirm-order'


function Logout({setlogged}){
setlogged(false);
  sessionStorage.removeItem("logged");
  sessionStorage.removeItem("username");
window.location.href="/";
}

function App() {

  const [logged,setlogged]= useState(sessionStorage.getItem("logged"));//null

  
return (
  <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Homepage setlogged={setlogged} logged={logged}/>}></Route>
        <Route path='/products' element={<Productspage logged={logged} setlogged={setlogged} />}></Route>
        <Route path='/catagory' element={<Catagorypage logged={logged} setlogged={setlogged}/>}></Route>
        <Route path="/change-password" element={<Forgotpage logged={logged} setlogged={setlogged}/>} ></Route>
        <Route path='/logout' element={<Logout logged={logged} setlogged={setlogged}/>}></Route>
        <Route path='/cart' element={<Cartpage logged={logged} setlogged={setlogged}/>}></Route>
        <Route path='/confirm-order' element={< Confirmorderpage/>}></Route>
       
    </Routes>
    </BrowserRouter>
</>
)
}

export default App
