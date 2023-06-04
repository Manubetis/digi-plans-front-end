const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const User = require('../models/User')

const validateCreateUser = [
    check('nombreApellidos', 'Debes introducir un nombre y apellidos').exists().isLength({ min: 5 }).isString(),
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
    check('fechaNacimiento', 'Introduce una fecha de nacimiento').exists().custom(
        (valor, { req }) => {
            const fechaNacimiento = new Date(valor);
            const edad = calcularEdad(fechaNacimiento);
            if (edad < 18) {
                throw new Error('Debes ser mayor de edad para registrarte.');
            }
            return true;
        }
    ),
    check('localidad', 'Introduce tu localidad').exists(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateSignIn = [
    check('email', 'Introduce un E-mail válido').exists().isEmail().withMessage('El email debe ser un email con formato correcto').custom(async (value) => {
        const user = await User.findOne({
            email: value
        });
        if (user) {
            throw new Error('El correo ya está en uso');

        }
        return true;
    }),
    check('password', 'Introduce una contraseña').exists()
]

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}

module.exports = { validateCreateUser, validateSignIn }