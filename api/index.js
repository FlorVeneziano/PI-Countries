//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env
const axios = require("axios")
const { Country } = require("./src/db")
// Syncing all the models at once.
conn.sync().then(async () => {

  const bD = await Country.findAll()
  if (bD.length < 1) {
    const carga = await axios.get("https://restcountries.com/v3.1/all")

    const Info = await carga.data?.map(el => {
      return {
        idName: el.cca3,
        name: el.name.common,
        image: el.flags.png,
        continent: el.continents[0],
        capital: el.capital ? el.capital[0] : "Capital not found",
        subregion: el.subregion,
        area: el.area,
        population: el.population
      }
    })
    const dbSave = await Country.bulkCreate(Info)

  }

  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
