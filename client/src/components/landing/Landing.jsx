import React from "react";
import { Link } from "react-router-dom";
import imageBackground from "../../img/nuevoFondo.jpg";
import './Landing.css'

export default function Landing() {
    return (
        <div className="countries">
       <Link to='/countries'>
           <button  className="button-64"><span span class="text">Go to home</span></button>
       </Link>        
       <div id="background"> 
        <img src={imageBackground} className="stretch" alt="" />  
   </div>
       </div>
    )
}

