const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded( {extended: true}));
app.use(express.static('public'));


app.listen(3333, (err) => {
    console.log('Servidor rodando na porta 3333');

    if(err){
        console.log(err);
    }
});


module.exports = () => {
    return app;
}