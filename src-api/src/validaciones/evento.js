const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreateEvent = [
    check('titulo', 'Debe ser mayor de 4 carácteres el titulo del evento').exists().isLength({ min: 4 }),
    check('categoria', 'Elige una categoria').exists().isIn(['Fiesta', 'Evento Deportivo', 'Ocio', 'Comida', 'Cultura', 'Viajes', 'Celebraciones']).withMessage('La categoria no existe'),
    check('fecha', 'Introduce una fecha para el evento').exists().custom(async (value) => {
        const fechaIntroducida = new Date(value);
        const fechaActual = new Date();
            if (fechaActual > fechaIntroducida) {
            throw new Error('Debes introducir una fecha posterior a la actual.');
        }
        return true;
    }),
    check('localidad', 'Debes introducir una localidad').exists().not().isEmpty(),
    check('datos_de_interes', 'Introduce datos de interes para el evento').isLength({max: 600}),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports= {validateCreateEvent}