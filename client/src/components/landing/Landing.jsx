import React from "react";
import { Link } from "react-router-dom";
import earth from "../../img/earth2.mp4"
import './Landing.css'

export default function Landing() {
    return (
        <div className="countries">
       <Link to='/countries'>
           <button  className="button-64"><span span class="text">Go to home</span></button>
       </Link>        
       <video autoPlay loop muted>
           <source src={earth} type="video/mp4"/>
       </video>
       </div>
    )
}

