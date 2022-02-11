import { GET_ALL, GET_BY_NAME, GET_COUNTRY, ORDER_SORT, ORDER_POPULATION, ORDER_CONTINENT, ORDER_BY_ACTIVITIES, POST_ACTIVITY } from '../actions/index'

const initialState = {
    allCountries: [],
    countries: [],
    countryDetail: {},
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }
        case GET_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case GET_COUNTRY:
            return {
                ...state,
                countryDetail: action.payload
            }
        case POST_ACTIVITY:
            return {
                ...state
            }
        case ORDER_SORT:
            let arr = action.payload === "Desc" ?
                state.countries.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1 // los cambia
                    } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1 //los cambia
                    } else {
                        return 0 //los deja igual
                    }
                }) :
                state.countries.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1 // los cambia
                    } else if (b.name.toLowerCase() < a.name.toLowerCase()) {
                        return 1 //los cambia
                    } else {
                        return 0 //los deja igual
                    }
                })
            return {
                ...state,
                countries: arr
            }
        case ORDER_POPULATION:
            let order = action.payload === "Desc" ?
                state.countries.sort((a, b) => {
                    if (a.population > b.population) {
                        return -1 // los cambia
                    } else if (b.population > a.population) {
                        return 1 //los cambia
                    } else {
                        return 0 //los deja igual
                    }
                }) :
                state.countries.sort((a, b) => {
                    if (a.population < b.population) {
                        return -1 // los cambia
                    } else if (b.population < a.population) {
                        return 1 //los cambia
                    } else {
                        return 0 //los deja igual
                    }
                })
            return {
                ...state,
                countries: order
            }
        case ORDER_CONTINENT:
            const countriesFilter = action.payload === "All" ? state.allCountries : state.allCountries.filter(el => el.continent === action.payload)
            return {
                ...state,
                countries: countriesFilter
            }
        case ORDER_BY_ACTIVITIES:
            let newArr = [];
            for (let i = 0; i < action.payload[0].length; i++) {
                for (let j = 0; j < action.payload[0][i].activities.length; j++) {
                    if (action.payload[0][i].activities[j].name === action.payload[1]) {
                        newArr.push(action.payload[0][i].id)
                    }
                }
            }
            let activityFilter = state.allCountries.filter(e => newArr.includes(e.id))
            return {
                ...state,
                countries: action.payload[1] === "All" ? state.allCountries : activityFilter,
            }
        default: {
            return state
        }
    }


}


export default rootReducer;