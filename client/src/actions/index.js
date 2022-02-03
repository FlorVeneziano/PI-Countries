import axios from "axios";
export const GET_ALL = "GET_ALL";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_BY_NAME = "GET_BY_NAME";
export const ORDER_SORT = "ORDER_SORT";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const ORDER_CONTINENT = "ORDER_CONTINENT";
const DBCOUNTRIES = "http://localhost:3001/countries/";


// export const getAllCountries = () => {
//     return async dispatch => {
//         let response = await axios.get("http://localhost:3001/countries")
//         dispatch({
//             type: GET_ALL,
//             payload: response.data.dbInfo
//         })


//     }
// }

export function getAllCountries() {
    return function (dispatch) {
        return fetch(DBCOUNTRIES)
            .then(response => response.json())
            .then(res => {
                dispatch({
                    type: GET_ALL,
                    payload: res.dbInfo
                })

            })
    }
}

// export const getByName = (name) => {
//     return async dispatch => {
//         let response = await axios.get("http://localhost:3001/countries?name=" + name)

//         dispatch({
//             type: GET_BY_NAME,
//             payload: response.data
//         })
//     }
// }

export function getByName(name) {
    return function (dispatch) {
        return fetch("http://localhost:3001/countries?name=" + name)
            .then(response => response.json())
            .then(res => {
                dispatch({
                    type: GET_BY_NAME,
                    payload: res
                })
            })
    }
}
// export function getCountry(id) {
//     return function (dispatch) {
//         return fetch(`http://localhost:3001/countries/${id}`)
//             .then(response => response.json())
//             .then(res => {
//                 console.log(res)
//                 dispatch({
//                     type: GET_COUNTRY,
//                     payload: res
//                 })

//             })
//     }
// }
export const getCountry = (id) => {
    return async dispatch => {
        let response = await axios.get(`http://localhost:3001/countries/${id}`)
        dispatch({
            type: GET_COUNTRY,
            payload: response.data
        })
    }
}

export const orderSort = (payload) => {
    return {
        type: ORDER_SORT,
        payload,
    }
}
export const orderPopulation = (payload) => {
    return {
        type: ORDER_POPULATION,
        payload,
    }
}

export const orderContinent = (payload) => {
    return {
        type: ORDER_CONTINENT,
        payload
    }
}