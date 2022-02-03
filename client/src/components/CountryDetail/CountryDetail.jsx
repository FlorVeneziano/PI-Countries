import React, { useEffect } from "react";
import { connect, useDispatch} from "react-redux";
import imageBackground from "../../img/fondoCountry.jpg";
import { getCountry } from "../../actions";
import "./CountryDetail.css"

function CountryDetail(props){
    console.log(props?.match.params.idName)
    const params = props?.match?.params.idName
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountry(params))
        console.log("me")
    },[])


    return(
        <>
        <div id="background"> 
        <img src={imageBackground} className="stretch" alt="" />  
   </div>
        <div className="card">
                <h3 className="text"> Id : {props.country.idName}</h3>
           <h2 className="text"> {props.country.name}</h2>
           <div>
                <h3 className="text"> Continent :</h3>
                <h3 className="text"> {props.country.continent}</h3>
            </div>
            <div>
                <h3 className="text">Capital : </h3>
                <h3 className="text">{props.country.capital} </h3>
            </div>
            <div>
                <p className="text">Subregion : </p>
                <p className="text">{props.country.subregion}</p>
            </div>
            <div>
                <p className="text">Population : </p> 
                <p className="text">{props.country.population}</p> 
            </div>
            <div>
                <p className="text">Area : </p> 
                <p className="text">{props.country.area} km</p> 
            </div>
            <div>
                <p className="text">Activities : </p> 
                <p className="text">{!props.country.activity? "Not activities yet" : props.country.activities} </p> 
            </div>
                <img className="flag" src={props.country.image} alt="Bandera" /> 
        </div>
        </>
    )
}

const mapStateToProps= (state)=>{
    return{
        country: state.countryDetail
    }
}


export default connect(mapStateToProps)(CountryDetail)