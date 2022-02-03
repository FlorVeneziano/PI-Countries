import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getAllCountries  } from "../../actions";


const Form = (props) => {

    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getAllCountries())
    }, [])
    
    return(
        <div>
            <form>
            <input name="name"  placeholder="Activity name..." />
            <div>
            <select>
                <option>Duration</option>
                <option>30 min</option>
                <option>1 Hr</option>
                <option>2 Hrs</option>
                <option>3 Hrs</option>
                <option>4 Hrs</option>
                <option>5 Hrs</option>
            </select>
            </div>
            <div>
            <select>
                <option>Difficulty</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <select>
                <option>Season</option>
                <option>Winter</option>
                <option>Spring</option>
                <option>Summer</option>
                <option>Autumn</option>
            </select>
            </div>
            <div>
                <select >
                    <option>Country</option>
                    {
                      props.countries?.map(c =>{
                            return(
                            <option key={c.id}>{c.name}</option>
                            )
                        }
                        )
                    }
                </select>
            </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        countries: state.countries
    }
}

export default connect(mapStateToProps)(Form)