const express = require('express');
const _       = require('underscore');

let { verificaToken, verificaAdminRole } = require('../middlewares/auth');

const app = express();

let Categoria = require('../models/categoria');

// ============================
// Muestra todas las categorias
// ============================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}, 'nombre estado')
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.countDocuments({}, (err, total) => {

                res.json({
                    ok: true,
                    total,
                    categorias
                });
            });
        });

});

// ============================
// Muestra una categoria por ID
// ============================
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id,{}, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            usuario: categoriaDB
        });
    }); 

});

// ===============================
// Crear una categoria 
// ===============================
app.post('/categoria', [verificaToken, verificaAdminRole], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

// ==============================
// Actualiza una categoria por ID
// ==============================
app.put('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id   = req.params.id;
    let data = {
        nombre:      req.body.nombre,
        descripcion: req.body.descripcion
    }

    Categoria.findByIdAndUpdate(id, data, { new: true, runValidators: true }, (err, categoriaDB) => {

        //console.log(categoriaDB);

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });    

});

// ==============================
// Borra una categoria por ID
// ==============================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

    // solo administrador    

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaborrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaborrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaborrada
        })

    });

});


module.exports = app;
