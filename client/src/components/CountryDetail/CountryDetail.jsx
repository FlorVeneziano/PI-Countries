import React, { useEffect } from "react";
import { connect, useDispatch} from "react-redux";
import imageBackground from "../../img/nuevoFondo.jpg";
import { getCountry } from "../../actions";
import "./CountryDetail.css"
import { Link } from "react-router-dom";

function CountryDetail(props){
    console.log(props?.match.params.idName)
    const params = props?.match?.params.idName
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountry(params))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
           <div  id="continent">
                <p className="text" id="continentTitle"> Continent :</p> <p className="text" id="continentData"> {props.country.continent}</p>
            </div>
            <div id="capital">
                <p className="text" id="titleUnderline" >Capital : </p> <p className="text">{props.country.capital} </p>
            </div>
            <div id="subregion"> 
                <p className="text" id="titleUnderline">Subregion : </p> <p className="text">{props.country.subregion}</p>
            </div>
            <div id="population">
                <p className="text" id="titleUnderline">Population : </p> <p className="text">{props.country.population}</p> 
            </div>
           <h2 className="text" id="title" > {props.country.name}</h2>
            <div id="area">
                <p className="text" id="titleUnderline" >Area : </p>   <p className="text">{props.country.area} km</p> 
            </div>
                <img className="flag" id="imageFlag" src={props.country.image} alt="Bandera" /> 
        </div>
        </div>
        <div className="activityContainer">
            <div className="card" id="activities">
                <p className="text" id="titleUnderline">Activities : </p> 
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
                        <details>
                            <summary>{a.name}</summary>
                    <p key={a.id}> 	&#x1F5F8; Name:  {a.name}  </p>
                    <p> &#128336;Duration:  {a.duration}</p>
                    <p>&#11088;Difficulty:  {a.difficulty} </p>
                    <p> {season}Season: {a.season} </p>
                    
                    </details>
                    )
                })} </div> 
            </div>
            </div>
             </div>
             <Link to={"/countries"}>
                <button className="text" id="buttonDetail">Go to main page</button>
                </Link>
        </>
    )
}

const mapStateToProps= (state)=>{
    return{
        country: state.countryDetail
    }
}


export default connect(mapStateToProps)(CountryDetail)