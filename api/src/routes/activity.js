const { Router } = require('express');
const { Activity, Country } = require('../db')
const router = Router();



router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;


    const activities = await Activity.create({ name: name, difficulty: difficulty, duration: duration, season: season })
    console.log(activities)
    try {
        countries.map(async country => {
            let search = await Country.findAll({ where: { id: country } })
            if (search) {
                activities.addCountry(country)
            }
        })
        res.send("Se creo correctamente la actividad")
    } catch (e) {
        res.status(400).send("Error al crear la actividad " + e)
    }


})




module.exports = router