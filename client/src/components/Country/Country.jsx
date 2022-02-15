import React from "react";
import{ Link }from "react-router-dom";
import "./Country.css"

function Country(props){
    return(
            <Link to={`/countries/${props.idName}`}>
            <div className="card">
                <h2 id="titleName" className="text">{props.name}</h2>
                <h3 className="text"> {props.continent}</h3>
                <h3 className="text"> Population: {props.population} </h3>
                
                <img className="flag" src={props.image} alt="Bandera" /> 

            </div>
                </Link>
    )
}


export default Country;