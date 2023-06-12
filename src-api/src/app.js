const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
var bcrypt = require('bcryptjs');
var path = require('path');

require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use('/api',require('./routes/index'))

app.use(express.static(path.join(__dirname, 'public')));

// Models
const User = require('./models/User');
const Evento = require('./models/Evento');

// AdminBro
const AdminBro = require('admin-bro')
const expressAdminbro = require('@admin-bro/express')
const mongooseAdminbro = require('@admin-bro/mongoose')

AdminBro.registerAdapter(mongooseAdminbro)

const AdminBroOptions = {
    assets:{
        styles:["/stylesAdmin.css"]
    },
    resources: [User, Evento]
}

const adminBro = new AdminBro(AdminBroOptions)

const router = expressAdminbro.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await User.findOne({
            email
        })
        if (user) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched && user.role == 'admin') {
                return user
            }
        }
        return false
    },
    cookiePassword: process.env.SECRETKEY,
})

app.use(adminBro.options.rootPath, router)

// Conexión
mongoose.connect(process.env.DB_URI).then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));

// Servidor escuchando
app.listen(process.env.PORT, () =>
    console.log("Servidor escuchando en el puerto " + process.env.PORT)
);