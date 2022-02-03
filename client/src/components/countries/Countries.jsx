import React  from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {getAllCountries} from "../../actions/index";
import Pagination from "../Pagination/Pagination";
import Country from "../Country/Country";
import imageBackground from "../../img/fondoCountry.jpg";
import './Countries.css'
import Filter from "../Filter/Filter";

 function Countries(props) {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
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
          <Filter setPage= {setPage} setOrder={setOrder} page={page}/>
            <Pagination page={page} setPage={setPage} max={max} />
        <div className="countries">
            {
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
                    
                }
           
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