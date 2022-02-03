import React from "react";

import { NavLink } from "react-router-dom";


function Nav(props){
    return(
        <header>
            <nav>
                <ul >
                        <NavLink exact to="/countries">Home</NavLink>
                        <NavLink exact to="/activity">Create Activity</NavLink>
                </ul>
            </nav>
        </header>
 
    )
}


export default Nav