import React from "react";
import{ Link }from "react-router-dom";
import "./Country.css"

function Country(props){
    return(
            <div className="card">
                <Link to={`/countries/${props.idName}`}>
                <h2 id="titleName" className="text">{props.name}</h2>
                </Link>
                <h3 className="text">{
                        !props.continent.includes(" America") ?
                         props.continent.slice(1, props.continent.length-1) : props.continent.slice(2, props.continent.length-2)
                        }</h3>
                <h3 className="text"> Population : {props.population} </h3>
                
                <img className="flag" src={props.image} alt="Bandera" /> 

            </div>
    )
}


export default Country;