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
process.env.TOKEN_EXPIRE = '480h';

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


// =========================
// GOOGLE CLIENT ID
// =========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '290449245938-ejv1n291ijgubosedub0mikh4oiro0h3.apps.googleusercontent.com';
