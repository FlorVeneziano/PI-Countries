import React, { useEffect } from "react";
import { connect, useDispatch} from "react-redux";
import imageBackground from "../../img/nuevoFondo.jpg";
import { getCountry } from "../../actions";
import "./CountryDetail.css"

function CountryDetail(props){
    console.log(props?.match.params.idName)
    const params = props?.match?.params.idName
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountry(params))
    },[])


    return(
        <>
        <div id="background"> 
        <img src={imageBackground} className="stretch" alt="" />  
   </div>
   <div className="divContainer" id="countryDetail" > 
   <div className="infoContainer">
        <div className="card" id="information">
                <h3 className="text" > Id : {props.country.idName}</h3>
           <h2 className="text" id="title"> {props.country.name}</h2>
           <div>
                <p className="text"> Continent :</p> <p className="text"> {props.country.continent}</p>
            </div>
            <div>
                <p className="text">Capital : </p> <p className="text">{props.country.capital} </p>
            </div>
            <div>
                <p className="text">Subregion : </p> <p className="text">{props.country.subregion}</p>
            </div>
            <div>
                <p className="text">Population : </p> <p className="text">{props.country.population}</p> 
            </div>
            <div>
                <p className="text">Area : </p>   <p className="text">{props.country.area} km</p> 
            </div>
                <img className="flag" src={props.country.image} alt="Bandera" /> 
        </div>
        </div>
        <div className="activityContainer">
            <div className="card" id="activities">
                <p className="text">Activities : </p> 
                <div className="text" id="lista">{props.country.activities?.map( a => {
                    let summer= <span>☀️</span>;
                    let winter = <span>❄️</span>;
                    let autumn = <span>🍁</span>
                    let spring= <span>🌸</span>;
                    let season;
                    if(a.season === "Summer") season = summer;
                    if(a.season === "Winter") season = winter;
                    if(a.season === "Autumn") season = autumn;
                    if(a.season === "Spring") season = spring;
                    return ( 
                        <>
                    <p key={a.id}> <span>	&#x1F5F8;</span> Name:  {a.name}  </p>
                    <p> <span>&#128336;</span>Duration:  {a.duration}</p>
                    <p><span>&#11088;</span>Difficulty:  {a.difficulty} </p>
                    <p> <span>{season}</span>Season: {a.season} </p>
                    </>
                    )
                })} </div> 
            </div>
            </div>
         
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