const { Router } = require('express');
const router = Router();
const { getDb, getInfo } = require("../utils")
const { Country, Activity } = require("../db");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        const id = await Country.findOne({ where: { idName: idPais }, include: { model: Activity } })
        id ? res.json(id) : res.send("El país no existe")

    } catch (e) {
        res.json({ msg: "Error al encontrar país por ID" })
    }

})




router.get('/', async (req, res, next) => { // localhost:3000/countries/
    const { name } = req.query;
    try {
        const pais = await Country.findAll({ include: { model: Activity } })
        if (name) {
            let paisName = await pais.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            paisName ? res.status(200).json(paisName) : res.status(400).send("No se encontro el pais")
        } else {
            next()
        }
    } catch (e) {
        res.json({ msg: "Error al intentar acceder al pais buscado" })
    }
})

router.get("/", async (req, res) => { // localhost:3000/countries/
    try {
        const dbInfo = await Country.findAll({
            include: {
                model: Activity,
            },
        })

        if (dbInfo.length > 1) {
            res.json({ dbInfo })
        } else {
            const apiDb = Promise.all([dbInfo(), getDb()]).then(result => res.json({ result }))
        }

    } catch (err) {
        res.json({ msg: "Problema base de datos" })
    }
})






module.exports = router;