const { Schema, model } = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    nombreApellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    eventosCreados: [{
        evento: {
            type: Schema.ObjectId,
            ref: 'Evento'
        }
    }],
    eventosInscritos: [{
        evento: {
            type: Schema.ObjectId,
            ref: 'Evento'
        }
    }],
    role: {
        type: String,
        enum: ['admin', 'restricted'],
        default: 'restricted'
    }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = model('User', userSchema)
