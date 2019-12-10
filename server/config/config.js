// =========================
// Puerto
// =========================
process.env.PORT = process.env.PORT || 3000

// =========================
// ENTORNO
// =========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
// Base de Datos
// =========================
let urlDB;

if( 0 )
{
    urlDB = 'mongodb://localhost:27017/productos';
}
else
{
    urlDB = 'mongodb+srv://lucas:V7QZDXveXxwkst1l@cluster0-0cwng.mongodb.net/cafe';
}
process.env.URLDB = urlDB;
