const jwt = require('jsonwebtoken');

// =========================
// Verifica Token
// =========================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
};

// =========================
// Verifica AdminRole
// =========================
let verificaAdminRole = (req, res, next) => {

    usuario = req.usuario;

    if(usuario.role != 'ADMIN_ROLE'){

        res.json({
            ok: false,
            err: {
                message: 'Debe ser administrador'
            }
        });
    }
    else{

        next();    
    }

};


module.exports = { 
    verificaToken,
    verificaAdminRole
}
