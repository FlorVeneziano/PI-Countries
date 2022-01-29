const axios = require("axios");

const { Country, Activity } = require("./db")


const getInfo = async () => {
    const getAll = await axios.get("https://restcountries.com/v3.1/all");
    const info = await getAll.data?.map(el => {
        return {
            idName: el.cca3,
            name: el.name,
            image: el.flags.png,
            continent: el.continents,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population
        }
    })
    return info
}


const getDb = async () => {
    const dbInfo = await Country.findAll({
        attibute: ["name"],
        include: {
            model: Activity,
        }
    })
    return dbInfo;
}




module.exports = {
    getDb,
    getInfo,

}