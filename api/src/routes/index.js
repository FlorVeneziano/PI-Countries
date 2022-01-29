const { Router } = require('express');
const { route } = require('./countries.js');
const countries = require('./countries.js')
const activity = require('./activity.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries);
router.use('/activity', activity);





module.exports = router;
