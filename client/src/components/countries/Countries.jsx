import React  from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {getAllCountries} from "../../actions/index";
import Pagination from "../Pagination/Pagination";
import Country from "../Country/Country";
import imageBackground from "../../img/nuevoFondo.jpg";
import './Countries.css'
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";

 function Countries(props) {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(9);
    const [order, setOrder] = useState("")
    const max = props.countries.length / perPage
   const dispatch  = useDispatch()

  
        useEffect(()=>{
            dispatch(getAllCountries())
        },[])


    return (
       <>
        <div id="background"> 
             <img src={imageBackground} className="stretch" alt="" />  
        </div>
    <div>
        <div className="panel">
        <div className="Filtros">
          <Filter  setOrder={setOrder} />
            <Pagination page={page} setPage={setPage} max={max} />
            </div>
            </div>
        <div className="countries">
        
            {
                props.countries?.length !== 0?
                props.countries?.slice((page-1) * perPage, (page - 1) * perPage + perPage ).map( c => ( // 0 * 10 = 0 , 0*10= 0 + 10 = 10 
                    <Country 
                    key={c.id}
                    id={c.id}
                    idName={c.idName}
                    name={c.name}
                    image= {c.image}
                    continent={c.continent}
                    population={c.population}
                    />
                    ))
                :
                <h1 className="alert">City not found</h1>                    
             }

      </div>   
   <a href="#">
      <button className="up">^</button>
      </a>
      </div>
 
   </>
    )
}

const mapStateToProps = (state) => {
    return{
        countries: state.countries
    }
}



export default connect(mapStateToProps)(Countries)