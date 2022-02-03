import React, { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCountries } from "../../actions";
import imageBackground from "../../img/fondoActivity.jpg"
import "./Form.css"


const Form = (props) => {
    const dispatch = useDispatch()
    const[errorsValue, setErrorsValue] = useState({})
    const [value, setValue] = useState({
        name: "",
        duration: "",
        difficulty: "",
        season: "",
        countries: []
    })

    useEffect(()=>{
        dispatch(getAllCountries())
    }, [])
    
    const handleChange = (e) => {
        e.preventDefault()
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
       
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorsValue(validateValue({
            ...value,
            [e.target.name] : e.target.value
        }))
        setErrorsValue(validateValue({
            ...value,
            countries: [...value.countries, e.target.value]
        }))
    }
    const removeCountry = (e) =>{
        setValue({  
            ...value,
            countries: value.countries.filter(c => c !== e.target.name)
        })

    }

    
    
    return(
        <>
        <div id="background"> 
             <img src={imageBackground} className="stretch" alt="" />  
        </div>
        <div className="divContainer">
            <form className="container" onSubmit={e => handleSubmit(e)}>
            <h1>New Activity</h1>
            <input className="activityName" name="name"  value={value.name} placeholder="Activity name..." onChange={e=> handleChange(e)}/>
            <p className="danger">{errorsValue.name}</p>
            <div>
            <select name="duration" value={value.duration} onChange={handleChange}>
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
            <select className="dif-ses" name="difficulty" value={value.difficulty} onChange={ handleChange}>
                <option hidden selected>Difficulty</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <select className="dif-ses" name="season" value={value.season} onChange={handleChange}>
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
                <select name="country" value={value.countries} 
                onChange={ (e) => { 
                    e.preventDefault(e)
                    setValue({
                        ...value,
                        countries: [...value.countries, e.target.value]
                    })
                    }}>
                    <option hidden selected>Country</option>
                    {
                      props.countries?.map(c =>{
                          
                            return(
                            <option key={c.id}>{c.name}</option>
                            )
                        }
                        )
                    }
                </select>
                <p className="danger">{errorsValue.countries}</p>
            </div>
            <div>
            <button type="submit" >Create Activity</button>
            </div>
            </form>
            <div className="countriesList">
                <ul>
                {
                    value.countries?.map(el => {
                      return ( 
                          <div key={el.id}>
                      <p className="lista">{el}</p>
                       <button name={el}className="closeButton" onClick={(e) => { removeCountry(e) }}>x</button>
                       </div>
                   )
                    })
                }
                </ul>
            </div>
        </div>
        <Link to={"/countries"} >
            <button>Go to Main Page</button>
        </Link>
        </>
    )
}



function validateValue(value){
    let errors = {}
    if(!value.name){
        errors.name = "Name is required"
    }
    if(!value.duration || value.duration === "Duration"){
        errors.duration = "Duration is required"
    }
    if(!value.difficulty || value.difficulty === "Difficulty"){
        errors.difficulty = "Difficulty is required"
    }
    if(!value.season || value.season === "Season"){
        errors.season = "Season is required"
    }
    if(!value.countries[0]){
        errors.countries = "Country is required"
    }
    if(repetidos(value.countries)){
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