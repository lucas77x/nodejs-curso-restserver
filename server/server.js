require('./config/config');

const express    = require('express');
const mongoose   = require('mongoose');
const app        = express();
const bodyParser = require('body-parser');
const path       = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json());

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
console.log(path.resolve(__dirname, '../public'));

// Incluyo las rutas 
app.use(require('./routes/index'));




// Google sign in
// Generar en:     https://developers.google.com/identity/sign-in/web/sign-in
// client_id:      290449245938-ejv1n291ijgubosedub0mikh4oiro0h3.apps.googleusercontent.com 
// client secret:  pOSM0-7_wpSaJ3xAPmhQLCNF 



//Conexion a DB
// lucas: V7QZDXveXxwkst1l
// mongodb+srv://lucas:V7QZDXveXxwkst1l@cluster0-0cwng.mongodb.net/cafe

//console.log( process.env.URLDB );

mongoose.connect(process.env.URLDB, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false},
    (err, res) => {        

        if(err) throw new err;
        console.log('Base de datos ONLINE!');
});


app.listen(process.env.PORT, () => { console.log(`Escuchando el puerto ${ process.env.PORT }`); })
