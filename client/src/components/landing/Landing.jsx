import React from "react";
import { Link } from "react-router-dom";

import './Landing.css'

export default function Landing() {
    return (
        <div className="back">
       <Link to='/countries'>

           <h1 className="h1Planet">
  <em>G</em>
  <em class="planet left">O</em>
  <em>H</em>
  <em class="planet right">O</em>
  <em>M</em>
  <em>E</em>
</h1>
       </Link>        

       </div>
    )
}

