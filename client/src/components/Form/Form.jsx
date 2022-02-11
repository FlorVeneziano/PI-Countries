import React, { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  getAllCountries, postActivity } from "../../actions";
import imageBackground from "../../img/fondoActivity.jpg"
import Loading from "../../Loading/Loading";
import "./Form.css"



const Form = (props) => {
    const dispatch = useDispatch()
    const[errorsValue, setErrorsValue] = useState({})
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");
    const [season, setSeason] = useState("");
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        dispatch(getAllCountries())
    }, [])
    
    
    const handleSubmit =  (e) => {
        e.preventDefault()
       setErrorsValue(validateValue({countries, name, difficulty, duration, season}))
       const error = validateValue({countries, name, difficulty, duration, season})
       if(Object.values(error).length === 0){
            dispatch(postActivity({name, difficulty, duration, season, countries}))
            document.formAct.reset();
          
       }
    }
 
    const removeCountry = (e) =>{
        setCountries( countries.filter(c => c !== e.target.name)
        )

    }


    
    return(
        <>
        <div id="background"> 
            <img src={imageBackground} className="stretch" alt="" /> 
        </div>
       {loading === true? <Loading  setLoading={setLoading} />  :
    <> 
        <div className="divContainer"> 
            <form className="container" name="formAct" onSubmit={e => handleSubmit(e)}>
            <h1 className="newActivity">New Activity</h1>
            <input className="activityName" name="name"  autoComplete="off" placeholder="Activity name..." onChange={e=> setName(e.target.value)}/>
            <p className="danger">{errorsValue.name}</p>
            <div>
            <select name="duration"  onChange={ e => setDuration(e.target.value)}>
                <option hidden selected>Duration</option>
                <option>30 min</option>
                <option>1 Hr</option>
                <option>2 Hrs</option>
                <option>3 Hrs</option>
                <option>4 Hrs</option>
                <option>5 Hrs</option>
            </select>
            <p className="danger">{errorsValue.duration}</p>
            </div>
            <div >
            <select className="dif-ses" name="difficulty" onChange={ e =>  setDifficulty(e.target.value)}>
                <option hidden selected>Difficulty</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <select className="dif-ses" name="season"  onChange={e => setSeason(e.target.value)}>
                <option hidden selected>Season</option>
                <option>Winter</option>
                <option>Spring</option>
                <option>Summer</option>
                <option>Autumn</option>
            </select>
            <div className="difficulty-season">
            <span className="danger">{errorsValue.difficulty}</span>  <span className="danger">{errorsValue.season}</span>
            </div>
            </div>
            <div>
                <select
                onChange={ (e) => { 
                    e.preventDefault(e)
                    setCountry((country) =>  [...country, e.target.value])
                    setCountries([...countries, e.target.value])
                    }}>
                    {
                      props.countries?.map(c =>{
                          return(
                            <option key={c.name} name={c.name} value={c.id} >{c.name}</option>
                            )
                        }
                        )
                    }
                </select>
                <p className="danger">{errorsValue.countries}</p>
            </div>
            <div>
            <button type="submit" className="createActivity">Create Activity</button>
            </div>
            </form>
            <div className="countriesList">
                <ul>
                {
                    countries?.map((el) => {
                        console.log(country)
                        console.log(countries)
                        let name = props.countries?.map((e) =>  e.id === el? e.name : null  )
                        return ( 
                            <div>
                      <span key={el.id} className="lista">{name}</span>
                       <button name={el}className="closeButton" onClick={(e) => { removeCountry(e) }}>❌</button>
                       </div>
                   )
        
                    })
                }
                </ul>
            </div>
        </div>
        <Link to={"/countries"} >
            <button className="mainPageButton">Go to Main Page</button>
        </Link>
 </>
}
        </>
    )
}



function validateValue({countries, name, duration, difficulty, season}){
    let errors = {}
    if(!name){
        errors.name = "Name is required"
    }
    if(!duration || duration === "Duration"){
        errors.duration = "Duration is required"
    }
    if(!difficulty || difficulty === "Difficulty"){
        errors.difficulty = "Difficulty is required"
    }
    if(!season || season === "Season"){
        errors.season = "Season is required"
    }
    if(!countries[0]){
        errors.countries = "Country is required"
    }
    if(repetidos(countries)){
        errors.countries = "You cannot enter duplicate countries"
    }
    return errors;
}

function repetidos(array){
    return new Set(array).size!==array.length
  }

const mapStateToProps = (state) =>{
    return{
        countries: state.countries,
       
    }
}


export default connect(mapStateToProps)(Form)