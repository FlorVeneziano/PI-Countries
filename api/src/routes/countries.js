const { Router } = require('express');
const router = Router();
const { getDb, getInfo } = require("../utils")
const { Country, Activity } = require("../db");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        if (name) {
            const pais = await Country.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                include: {
                    model: Activity,
                }
            })
            pais ? res.json(pais) : "No se encontro el pais"
        } else {
            next()
        }
    } catch (e) {
        res.json({ msg: Error })
    }
})

router.get("/", async (req, res) => {
    try {
        const dbInfo = await Country.findAll({
            attributes: ["name"],
            include: {
                model: Activity,
            }
        })

        if (dbInfo.length > 1) {
            res.json({ dbInfo })
        } else {
            const apiDb = Promise.all([getInfo(), getDb()]).then(result => res.json({ result }))
        }

    } catch (err) {
        res.json({ msg: "Problema base de datos" })
    }
})



router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        const id = await Country.findOne({ where: { idName: idPais }, include: { model: Activity } })
        id ? res.json(id) : res.send("El país no existe")
    } catch (e) {
        res.json({ msg: "Error al encontrar país por ID" })
    }

})



module.exports = router;