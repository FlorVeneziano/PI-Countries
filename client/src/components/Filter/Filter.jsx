import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, orderContinent, orderPopulation, orderSort, orderByActivities } from "../../actions";

function Filter({setOrder}){
    
    const dispatch = useDispatch();
    
    const handleSort = (e) =>{
        dispatch(orderSort(e.target.value))
        setOrder(`Order ${e.target.value}`)
    }
    const handlePopulation = (e) =>{
        dispatch(orderPopulation(e.target.value))
        setOrder(`Order ${e.target.value}`)
    }
    useEffect(() =>{
        setOrder("Ordenado")
    }, [handleSort, handlePopulation])
    
    const handleContinent = (e) =>{
        e.preventDefault()
        dispatch(orderContinent(e.target.value))
    }
    
    const cargeCountries = () => {
        dispatch(getAllCountries())  
    }

    const handleActivities = (e) => {
        dispatch(orderByActivities(e.target.value))
    }

    const countries = useSelector(state => state.allCountries)

    let Activities = [] //guardo todas las actividades
   for (let i = 0; i < countries.length; i++) {
        Activities.push(countries[i].activities)
    }

    let filterAct =  []; //filtro las que no tienen nada
    Activities.forEach((item)=>{ 
    	//pushes only unique element
        if(!filterAct.includes(item.id) && item.length > 0){
            filterAct.push(item);
    	}
    })
 
    let names = [] //filtro los nombres
    // eslint-disable-next-line array-callback-return
    filterAct.map(e => {
        // eslint-disable-next-line array-callback-return
        e.map(e => { if(!names.includes(e.name)) names.push(e.name)})
    })
    
    return(
        <div>


             <select defaultValue={"DEFAULT"} onChange={(e) => handleActivities(e)} >
                  <option value="DEFAULT" hidden>Sort by Activities</option>
                  <option value="All"> All</option>
                    {
                        names.map(e => {    
                            return(
                            <option key={e} value={e}>{e}</option>
                            )
                        })   
                    }


                </select>
                <select defaultValue={"DEFAULT"} onChange={e => handleContinent(e)}>
                <option value="DEFAULT" hidden>Continents</option>
                <option value="All">All Continents</option>
                <option value="Africa">Africa</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                </select>


                <select defaultValue={"DEFAULT"} onChange={e => handleSort(e)}>
                    <option value="DEFAULT" >Alphabetic</option>
                    <option value="Asc">A-Z</option>
                    <option value="Desc">Z-A</option>
                </select>


                <select defaultValue={"DEFAULT"} onChange={e=> handlePopulation(e)}>
                <option value="DEFAULT" >Sort by Population </option>
                    <option value="Asc">Ascending Population</option>
                    <option value="Desc">Descending Population</option>
                </select>


                <button className="buttonAllCountries" onClick={cargeCountries} >All Countries</button>
        </div>
    )
}



export default Filter