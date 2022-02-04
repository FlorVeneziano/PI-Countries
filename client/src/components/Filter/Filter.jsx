import React from "react";
import { useDispatch } from "react-redux";
import { getAllCountries, orderContinent, orderPopulation, orderSort } from "../../actions";

function Filter({setPage, setOrder, page}){
    
    const dispatch = useDispatch();


    const handleSort = (e) =>{
        e.preventDefault();
        dispatch(orderSort(e.target.value))
        setOrder(`Order ${e.target.value}`)
    }
    const handlePopulation = (e) =>{
        e.preventDefault();
        dispatch(orderPopulation(e.target.value))
        setOrder(`Order ${e.target.value}`)
    }

    const handleContinent = (e) =>{
        e.preventDefault()
        dispatch(orderContinent(e.target.value))
    }
    
    const cargeCountries = () => {
        dispatch(getAllCountries())
        
    }

    return(
        <div>
             <select>
                  <option hidden selected>Sort by Activities</option>
                    <option value="Activity">Turist Activity</option>
                </select>
                <select onChange={e => handleContinent(e)}>
                <option value="All">All Continents</option>
                <option value="Africa">Africa</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                </select>
                <select  onChange={e => handleSort(e)}>
                    <option hidden selected>Alphabetic</option>
                    <option value="Asc">A-Z</option>
                    <option value="Desc">Z-A</option>
                </select>
                <select onChange={e=> handlePopulation(e)}>
                <option hidden selected>Sort by Population </option>
                    <option value="Asc">Ascending Population</option>
                    <option value="Desc">Descending Population</option>
                </select>
                <button onClick={cargeCountries} >All Countries</button>
        </div>
    )
}



export default Filter