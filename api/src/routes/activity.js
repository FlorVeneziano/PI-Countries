const { Router } = require('express');
const { Activity, Country } = require('../db')
const router = Router();



router.post('/', async (req, res) => {
    const { activity, countries } = req.body;

    try {
        const activities = await Activity.create(activity)
        countries.forEach(async country => {
            let search = await Country.findAll({ where: { id: country } })
            if (search) {
                activities.addCountry(country)
            }
        })
        res.send("Actividad creada")
    } catch (e) {
        res.json({ msg: "Error al asignar la actividad" })
    }
})




module.exports = router