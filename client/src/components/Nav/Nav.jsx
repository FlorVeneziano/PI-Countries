import React from "react";
import "./Nav.css"

import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


function Nav(props){
    return(
        <header className="navBar" >
            <nav >
                <ul className="cosas">
                        <NavLink exact to="/activity"  className="ulNav">Create Activity</NavLink>
                        <SearchBar />
                </ul>
            </nav>
        </header>
 
    )
}


export default Nav