import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAllCountries, getByName } from "../../actions";
import "./SearchBar.css"



function SearchBar(){

    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const busqueda = (arg) => {
        arg === ""
          ? dispatch(getAllCountries())
          : //else
            dispatch(getByName(arg));
      };

    const handleChange =  (e) =>{
        e.preventDefault()
        busqueda(e.target.value) 
        setValue(e.target.value)
    }
   

    return(
        <div> 
            <input className="inputSearch" placeholder="Country..."  onChange={e => handleChange(e)}/>
        </div>
    )
}


export default SearchBar;