const express = require('express');
const fs      = require('fs');
const path    = require('path');

const { verificaTokenImg } = require('../middlewares/auth');

const app = express();

module.exports = app;

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let imgPath = path.resolve(__dirname,`../../uploads/${ tipo }/${ img }`);
    let noImgPath = path.resolve(__dirname,'../assets/no-image.jpg');

    

    if( fs.existsSync(imgPath))
        res.sendFile(imgPath);
    else
        res.sendFile(noImgPath);
    
});
