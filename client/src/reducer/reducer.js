import { GET_ALL, GET_BY_NAME, GET_COUNTRY, ORDER_SORT, ORDER_POPULATION, ORDER_CONTINENT } from '../actions/index'

const initialState = {
    countries: [],
    countryDetail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                countries: action.payload,

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
            const countriesAll = state.countries
            const countriesFilter = action.payload === "All" ? countriesAll : countriesAll.filter(el => el.continent.includes(action.payload))
            return {
                ...state,
                countries: countriesFilter
            }
        default: {
            return state
        }
    }


}


export default rootReducer;