const {
    Router
} = require('express');
const router = Router();

const User = require('../models/User');
const Evento = require('../models/Evento');

const jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

const {
    validateCreateUser
} = require('../validaciones/user');
const {
    validateSignIn
} = require('../validaciones/user')
const {
    validateCreateEvent
} = require('../validaciones/evento');

router.post('/signin', validateSignIn, async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    })

    if (!user) return res.status(401).send("El email no existe");

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) return res.status(401).send("La contraseña no es correcta")

    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.SECRETKEY);
    return res.status(200).json({
        token
    });

});

router.post('/signup', validateCreateUser, async (req, res) => {

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

    await user.save();

    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.SECRETKEY);
    return res.status(200).json({
        token
    });
})

router.post('/crear-evento', validateCreateEvent, async (req, res) => {
    const {
        titulo,
        categoria,
        fecha,
        localidad,
        datos_de_interes,
        creador
    } = req.body

    const evento = new Evento({
        titulo,
        categoria,
        fecha,
        localidad,
        datos_de_interes,
        creador
    })

    const fechaActual = new Date();

    if (new Date(fecha) < fechaActual) {
        return res.status(400).json({
            error: 'La fecha debe ser posterior a la fecha actual'
        });
    }

    await evento.save();

    res.status(200).json({
        message: 'Evento creado exitosamente'
    });
})

router.put('/inscribirUsuario', async (req, res) => {
    try {
        const { usuarioId, eventoId } = req.body;

        // Buscar el usuario y el evento en la base de datos
        const usuario = await User.findById(usuarioId);
    
        // Verificar si el usuario ya está inscrito en el evento
        if (usuario.eventosInscritos.some(e => e.evento.equals(eventoId))) {
          return res.status(400).json({ error: 'El usuario ya está inscrito en el evento' });
        }
    
        // Agregar la ID del evento al array eventosInscritos del usuario
        usuario.eventosInscritos.push({ evento: eventoId });
    
        // Guardar los cambios en el usuario
        await usuario.save();
        res.status(200).json({
            message: 'Se ha inscrito el usuario al evento'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al inscribirse al evento'
        });
    }
});

router.put('/desinscribirUsuario', async (req, res) => {
    try {
      const { usuarioId, eventoId } = req.body;
  
      // Buscar el usuario y el evento en la base de datos
      const usuario = await User.findById(usuarioId);
  
      // Verificar si el usuario está inscrito en el evento
      const eventoIndex = usuario.eventosInscritos.findIndex(e => e.evento.equals(eventoId));
      if (eventoIndex === -1) {
        return res.status(400).json({ error: 'El usuario no está inscrito en el evento' });
      }
  
      // Remover la ID del evento del array eventosInscritos del usuario
      usuario.eventosInscritos.splice(eventoIndex, 1);
  
      // Guardar los cambios en el usuario
      await usuario.save();
      res.status(200).json({
        message: 'El usuario ha sido desinscrito del evento'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al desinscribirse del evento'
      });
    }
  });
  


router.get('/eventosInscritos/:usuarioId', async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId;

        // Buscar el usuario en la base de datos
        const usuario = await User.findById(usuarioId).populate('eventosInscritos.evento');

        if (!usuario) {
            return res.status(404).json({
                error: 'No se encontró el usuario'
            });
        }

        const eventosInscritos = usuario.eventosInscritos.map(e => e.evento);
        console.log(eventosInscritos);

        res.status(200).json({
            eventosInscritos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al obtener los eventos inscritos del usuario'
        });
    }
});

// Endpoint para obtener todos los eventos
router.get('/obtener-eventos', async (req, res) => {
    try {
        const eventos = await Evento.db.collection('eventos').find().toArray();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los eventos'
        });
    }
})

// Endpoint para obtener el usuario por la id
router.get('/obtener-usuario/:id', async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el usuario'
        });
    }
})

// Endpoint para obtener un evento por el id que se le pase por parámetro
router.get('/obtener-eventos/:id', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        res.json(evento);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el evento'
        });
    }
})

// Endpoint para obtener un evento por el creador que se le pase por parámetro
router.get('/obtener-eventos/creador/:creador', async (req, res) => {
    try {
        const evento = await Evento.find({ creador: req.params.creador });
        res.json(evento);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el evento'
        });
    }
})

// Endpoitn para actualizar un evento
router.put('/actualizar-eventos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const actualizacion = req.body;

        const eventoActualizado = await Evento.findByIdAndUpdate(id, actualizacion, {
            new: true
        });

        if (!eventoActualizado) {
            return res.status(404).json({
                error: 'No se encontró ningún evento con ese ID'
            });
        }

        res.status(200).json(eventoActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al actualizar el evento'
        });
    }
})

// Endpoint para eliminar un evento
router.delete('/obtener-eventos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const eventoEliminado = await Evento.findByIdAndDelete(id);

        if (!eventoEliminado) {
            return res.status(404).json({
                error: 'No se encontró ningún evento con ese ID'
            });
        }

        res.status(200).json({
            message: 'Evento eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el evento'
        });
    }
})

// Metodo
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