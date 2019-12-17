const express = require('express');

let { verificaToken, verificaAdminRole } = require('../middlewares/auth');

const app = express();

let Producto = require('../models/producto');

// ============================
// Obtener todos los productos
// ============================
app.get('/producto', verificaToken, (req, res) => {

    let desde  = Number(req.query.desde)  || 0;
    let limite = Number(req.query.limite) || 5;    

    Producto.find({ disponible: true }, 'nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre descripcion')
        .sort('nombre')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.countDocuments({disponible: true}, (err, total) => {

                res.json({
                    ok: true,
                    total,
                    productos
                });
            });
        });

});

// ==========================
// Muestra un producto por ID
// ==========================
app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, {}, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    })
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre descripcion');

});

// ================
// Buscar productos
// ================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec( (err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });
});

// ===============================
// Crear un producto
// ===============================
app.post('/producto', [verificaToken, verificaAdminRole], (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        usuario: req.usuario._id,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

// ==============================
// Actualiza un producto por ID
// ==============================
app.put('/producto/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;
    let data = {
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        usuario: req.usuario._id,
        categoria: req.body.categoria
    }

    Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });        
    });   


});

// ==============================
// Borra un producto por ID
// ==============================
app.delete('/producto/:id', [verificaToken, verificaAdminRole], (req, res) => {
    
    // no lo borra, hace update del estado   

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});


module.exports = app;
