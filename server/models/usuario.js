const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El mail es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true],
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        required: [true],
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Excluir atributos
usuarioSchema.methods.toJSON = function () {

    let userObject = this.toObject();
    delete userObject.password;    
    delete userObject.__v;    
    return userObject;
}

usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('Usuario', usuarioSchema);
