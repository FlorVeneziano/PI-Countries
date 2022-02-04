import React, { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createActivity, getAllCountries } from "../../actions";
import axios from "axios";
import imageBackground from "../../img/fondoActivity.jpg"
import "./Form.css"



const Form = (props) => {
    const dispatch = useDispatch()
    const[errorsValue, setErrorsValue] = useState({})
    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    })
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");
    const [season, setSeason] = useState("");
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState([])
 
    useEffect(()=>{
        dispatch(getAllCountries())
    }, [])
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
       const error1 = setErrorsValue(validateValue({countries, name, difficulty, duration, season}))
            try{
                await 
                    axios.post(`http://localhost:3001/activity`, {  name, difficulty, duration, season, countries })
                    .then((response) => {
                    alert("Your activity has been created");
                    document.formAct.reset();
                    });
                // fetch(`http://localhost:3001/activity`, {method: 'POST', body: { }})
                // .then((response) => {
                //   alert("Your activity has been created");
                // });
            }catch(e){
                console.log("Error: " + e)
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
        <div className="divContainer">
            <form className="container" name="formAct" onSubmit={e => handleSubmit(e)}>
            <h1>New Activity</h1>
            <input className="activityName" name="name"   placeholder="Activity name..." onChange={e=> setName(e.target.value)}/>
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
            <button type="submit">Create Activity</button>
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
                      <p key={el.id} className="lista">{name}</p>
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