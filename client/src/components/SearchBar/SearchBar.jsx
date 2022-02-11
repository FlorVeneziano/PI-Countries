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
        console.log(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        busqueda(value)
        setValue("")
    }

    return(
        <div>
            
                <input className="inputSearch" placeholder="Country..."  onChange={e => handleChange(e)}/>
                <button className="bottonSearch" type="submit" onSubmit={handleSubmit}> <span className="text">Search </span></button>

        
        </div>
    )
}


export default SearchBar;