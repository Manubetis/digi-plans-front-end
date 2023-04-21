const {check} = require('express-validator')
const {validateResult} = require('../helpers/validateHelper')
const User = require('../models/User')

const validateCreate = [
    check('nombreApellidos').exists().isLength({ min: 5 }),
    check('email', 'Introduce un E-mail válido').exists().isEmail().withMessage('El email debe ser un email con formato correcto').custom(async (value) => {
        const user = await User.findOne({
            email: value
        });
        if (user) {
            throw new Error('El correo ya está en uso');

        }
        return true;
    }),
    check('password', 'Introduce una contraseña').exists(),
    check('fechaNacimiento', 'Introduce una fecha de nacimiento').exists(),
    check('localidad', 'Introduce tu localidad').exists(),
    (req, res, next) =>{
        validateResult(req, res, next);
    }
]

module.exports = {validateCreate}