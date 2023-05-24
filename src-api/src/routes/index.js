const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const Evento = require('../models/Evento');

const jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

const { validateCreate } = require('../validaciones/user');

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) return res.status(401).send("El email no existe");

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) return res.status(401).send("La contraseña no es correcta")

    const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);
    return res.status(200).json({ token });

});

router.post('/signup', validateCreate, async (req, res) => {

    const {
        nombreApellidos,
        email,
        password,
        fechaNacimiento,
        localidad
    } = req.body

    const user = new User({
        nombreApellidos,
        email,
        password,
        fechaNacimiento,
        localidad
    })

    if (await User.findOne({
        email
    })) {
        return res.status(401).send("El correo ya está en uso")
    }

    if (await User.findOne({
        nombreApellidos
    })) {
        return res.status(401).send("El nombre de usuario ya está en uso")
    }

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);
    return res.status(200).json({ token });
})

router.post('/crear-evento', async (req, res) => {
    const {
        titulo,
        categoria,
        fecha,
        localidad,
        datos_de_interes
    } = req.body

    const evento = new Evento({
        titulo,
        categoria,
        fecha,
        localidad,
        datos_de_interes
    })

    const fechaActual = new Date();

    if (new Date(fecha) < fechaActual) {
        return res.status(400).json({ error: 'La fecha debe ser posterior a la fecha actual' });
    }

    await evento.save();
    res.status(200).json({ message: 'Evento creado exitosamente' });
})

router.get('/obtener-eventos', async (req, res) => {
    try {
        const eventos = await Evento.db.collection('eventos').find().toArray();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
})


router.get('/obtener-eventos/', async (req, res) => {
    try {
        const eventos = await Evento.findById(req.params.id);
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token == null) {
        return res.status(401).send('Unauthorized request')
    }

    const payload = jwt.verify(token, process.env.SECRETKEY)

    req.userId = payload._id
    next()
}

module.exports = router;