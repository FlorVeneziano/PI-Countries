export const GET_ALL = "GET_ALL";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_BY_NAME = "GET_BY_NAME";
export const ORDER_SORT = "ORDER_SORT";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const ORDER_CONTINENT = "ORDER_CONTINENT";
export const ORDER_BY_ACTIVITIES = "ORDER_BY_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_ERROR = "GET_ERROR";
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
        try {
            return fetch(DBCOUNTRIES)
                .then(response => response.json())
                .then(res => {
                    dispatch({
                        type: GET_ALL,
                        payload: res.dbInfo
                    })
                })
        } catch (e) {
            console.log("getAllCountries " + e)
        }
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
        try {
            return fetch("http://localhost:3001/countries?name=" + name)
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                    if (!res.msg) {
                        dispatch({
                            type: GET_BY_NAME,
                            payload: res
                        })
                    } else {
                        dispatch({
                            type: GET_ERROR,
                            payload: res.msg
                        })
                    }
                })
        } catch (e) {
            console.log("getByName " + e)
        }
    }
}
export function getCountry(id) {
    return function (dispatch) {
        try {
            return fetch(`http://localhost:3001/countries/${id}`)
                .then(response => response.json())
                .then(res => {

                    dispatch({
                        type: GET_COUNTRY,
                        payload: res
                    })

                })
        } catch (e) {
            console.log("getCountry " + e)
        }
    }
}
// export const getCountry = (id) => {
//     return async dispatch => {
//         let response = await axios.get(`http://localhost:3001/countries/${id}`)
//         dispatch({
//             type: GET_COUNTRY,
//             payload: response.data
//         })
//     }
// }


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

export const orderByActivities = (activity) => {
    return dispatch => {
        try {
            return fetch("http://localhost:3001/countries")
                .then(response => response.json())
                .then(res => {
                    dispatch({
                        type: ORDER_BY_ACTIVITIES,
                        payload: [res.dbInfo, activity]
                    })
                })
        } catch (e) {
            console.log("orderByActivities " + e)
        }
    }

}

// axios.post(`http://localhost:3001/activity`, {  name, difficulty, duration, season, countries })
// .then((response) => {
// alert("Your activity has been created");
// document.formAct.reset();
// });

export const postActivity = (payload) => {
    return dispatch => {
        try {
            return fetch(`http://localhost:3001/activity`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((response) => {
                    dispatch({
                        type: POST_ACTIVITY
                    })
                })
        } catch (e) {
            console.log("postActivity " + e)
        }
    }
}