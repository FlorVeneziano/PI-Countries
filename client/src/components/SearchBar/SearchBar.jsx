import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAllCountries, getByName } from "../../actions";




function SearchBar(){

    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const busqueda = (arg) => {
        arg === ""
          ? dispatch(getAllCountries())
          : //else
            dispatch(getByName(arg));
      };

    const handleChange = async (e) =>{
        e.preventDefault()
        busqueda(e.target.value)
        await setValue(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        busqueda(value)
        setValue("")
    }

    return(
        <div>
            
                <input placeholder="Country..."  onChange={e => handleChange(e)}/>
                <button type="submit" onSubmit={handleSubmit}>Search</button>

        
        </div>
    )
}


export default SearchBar;