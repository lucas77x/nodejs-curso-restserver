// =========================
// Puerto
// =========================
process.env.PORT = process.env.PORT || 3000

// =========================
// ENTORNO
// =========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
// VENCIMIENTO DEL TOKEN
// =========================
process.env.TOKEN_EXPIRE = 60 * 60 * 24 * 30;

// =========================
// SEED
// =========================
process.env.SEED = process.env.SEED || 'el-secret-local';


// =========================
// Base de Datos
// =========================
let urlDB;

if (process.env.NODE_ENV === 'dev' )
{
    urlDB = 'mongodb://localhost:27017/cursonode';
}
else
{
    urlDB = 'mongodb+srv://lucas:V7QZDXveXxwkst1l@cluster0-0cwng.mongodb.net/cursonode';
}
process.env.URLDB = urlDB;
