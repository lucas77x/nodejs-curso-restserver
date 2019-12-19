const express = require('express');
const fileUpload = require('express-fileupload');
//let { verificaToken, verificaAdminRole } = require('../middlewares/auth');

const app = express();

const Usuario  = require('../models/usuario');
const Producto = require('../models/producto');

const fs   = require('fs');
const path = require('path');

app.use(fileUpload());

app.put('/upload/:tipo/:id', function (req, res) {

    let id   = req.params.id;
    let tipo = req.params.tipo;

    let tiposValidos  = ['producto', 'usuario'];
    let extValidas    = ['png', 'gif', 'jpg', 'jpeg'];
    let archivo       = req.files.archivo;
    let archivoSplit  = archivo.name.split('.');
    let extension     = archivoSplit[archivoSplit.length - 1];

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded.'
            }
            
        });
    }

    // Valida tipo
    if( tiposValidos.indexOf(tipo) < 0 ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Los tipos permitidos son ' + tiposValidos.join(', '),
                    recibido: tipo
                }

            });
    }

    // Valida extension
    if (extValidas.indexOf(extension) < 0) {

        return res.status(400).json({
            ok: false,
            err: {
                message: "Extension no valida",
                permitidas: extValidas.join(', '),
                recibida: extension
            }
        });

    }

    // Cambio nombre al archivo
    let archivoNombre = `${ id }-${ new Date().getMilliseconds() }.${ extension }`;
    
    let dir = `uploads/${tipo}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }, (err) => {

            return res.status(500).json({
                ok: false,
                err
            });
        });
    }

    archivo.mv(`uploads/${tipo}/${archivoNombre}`, (err, archivoCargado) => {

        if (err){

            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Aqui, imagen usuario
        if(tipo === 'usuario')
            imagenUsuario(id, res, archivoNombre,tipo);
        else
            imagenProducto(id, res, archivoNombre, tipo);
        
    });
    

});


function imagenUsuario(id, res, archivoNombre, tipo){

    Usuario.findById(id, (err, usuarioDB) => {

        if(err){

            borraArchivo(archivoNombre,tipo);

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!usuarioDB){

            borraArchivo(archivoNombre, tipo);

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, tipo);

        usuarioDB.img = archivoNombre;
        usuarioDB.save( (err, usuarioGuardado) => {

            return res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: archivoNombre
            });

        });




    });

}

function imagenProducto(id, res, archivoNombre, tipo){

    Producto.findById(id, (err, productoDB) => {

        if (err) {

            borraArchivo(productoDB.img, tipo);

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {

            borraArchivo(productoDB.img, tipo);

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        borraArchivo(productoDB.img, tipo);

        productoDB.img = archivoNombre;
        productoDB.save((err, productoGuardado) => {

            return res.json({
                ok: true,
                producto: productoGuardado,
                img: archivoNombre
            });

        });




    });

}

function borraArchivo(archivoNombre, tipo){

    // Elimina el archivo anterior
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${archivoNombre}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }

}

module.exports = app;
