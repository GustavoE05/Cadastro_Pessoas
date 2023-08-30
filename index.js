const express = require('express');
const path = require('path');
const session = require('express-session');
const PessoasController = require('./Controllers/PessoasController');
const UsuarioController = require('./Controllers/UsuariosController');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const app = express();
const port = 2000;
const Database = require('./Models/Database');


app.use(express.static(path.join(__dirname, 'PUBLIC')));
app.use(session({secret: 'l1nd4c4ch34d4'}));

app.use((req, res, next) => {
    if(!req.session.user){
        if(req.url == '/login' || req.url == '/autenticar'){
            app.set('layout', 'layouts/default/login');
            res.locals.layoutsVAriables = {
                url : process.env.URL,
                style : '/css/',
                title : 'Login',
                user : req.session.usuario
            };
            next();
        }else{
            res.redirect('login');
        }
        }else{
            app.set('layout', 'layouts/default/index');
            res.locals.layoutsVariables = {
                url : process.env.URL,
                img : '/img/',
                style : '/css/',
                title : 'Home',
                user : req.session.usuario
            };
            next();
        }
});


app.set('view engine', 'ejs');
app.get('/', (req, res) => {    
    res.render('home');
});

app.use(expressLayouts);

app.use(express.urlencoded({extended: true}));

//Rotas
app.get('/pessoas', PessoasController.getPessoas);
app.post('/pessoas', PessoasController.addPessoa);
app.put('/pessoas', PessoasController.addPessoa);
app.get('/pessoas', PessoasController.addPessoa);

//Rotas de Usuários

app.get('/login', (req, res) => {
    UsuarioController.login(req, res);
})

app.post('/login', (req, res) => {
    UsuarioController.autenticar(req, res);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});