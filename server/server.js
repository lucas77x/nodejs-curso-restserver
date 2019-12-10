require('./config/config');

const express    = require('express');
const mongoose   = require('mongoose');
const app        = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json());

// Incluyo archivo con las rutas del usuario
app.use( require('./routes/usuario'));

//Conexion a DB
// lucas: V7QZDXveXxwkst1l
// mongodb+srv://lucas:V7QZDXveXxwkst1l@cluster0-0cwng.mongodb.net/cafe

//console.log( process.env.URLDB );

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
                (err, res) => {        

    if(err) throw new err;
    console.log('Base de datos ONLINE!');
});


app.listen(process.env.PORT, () => { console.log(`Escuchando el puerto ${process.env.PORT}`); })
