const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es requerida']
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario',
        required: [false, 'El usuario_id es requerido']
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
