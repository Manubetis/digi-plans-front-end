const {Schema, model} = require('mongoose');

const userSchema =  new Schema({
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        enum: ['Fiesta', 'Evento Deportivo', 'Ocio', 'Comida', 'Cultura', 'Viajes', 'Celebraciones'],
        required:true
    },
    fecha: {
        type: Date,
        required:true
    },
    localidad: {
        type: String,
        required:true
    },
    datos_de_interes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model ('Evento', userSchema)