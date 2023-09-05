const express = require('express');
const path = require('path');
const multer = require('multer');
const formiable = require('formidable');
const session = require('express-session');
const PessoasController = require('./Controllers/PessoasController');
const UsuarioController = require('./Controllers/UsuariosController');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const app = express();
const port = 2000;
const Database = require('./Models/Database');
const Pessoa = require('./Models/PessoasModels');
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'PUBLIC')));
app.use(session({secret: 'l1nd4c4ch34d4'}));

app.use((req, res, next) => {
    if(!req.session.user){
        if(req.url == '/login' || req.url == '/autenticar' || req.url == '/cadastro' || req.url == '/home'){
            app.set('layout', 'layouts/default/login');
            res.locals.layoutsVariables = {
                url : process.env.URL,
                style : '/css/',
                title : 'Login',
                user : req.session.user
            };
            next();
        }else{
           res.redirect('/login');
           return;
        }
        }else if(req.session.user){
            app.set('layout', 'layouts/default/index');
            res.locals.layoutsVariables = {
                url : process.env.URL,
                img : '/img/',
                style : '/css/',
                title : 'Home',
                user : req.session.user
            
            }
            if(req.session.msg){
                res.locals.layoutsVariables.msg = req.session.msg;
                delete req.session.msg;
            }
            next();
        }
});


app.set('view engine', 'ejs');
app.get('/home', (req, res) => {    
    res.render('home');
});

app.use(expressLayouts);

app.use(express.urlencoded({extended: true}));

//Rotas
app.get('/pessoas', PessoasController.getPessoas);
app.post('/pessoas', PessoasController.addPessoa);
app.delete('/pessoa', PessoasController.addPessoa);
app.put('/pessoa', PessoasController.addPessoa);
app.get('/pessoa', PessoasController.addPessoa);

//Rotas de Usuários

app.get('/cadastro',(req,res)=>{
    UsuarioController.cadastro(req, res);
})

app.post('/cadastro', (req, res) => {
    UsuarioController.cadastrar(req, res);
})

app.get('/login', (req, res) => {
    UsuarioController.login(req, res);
})

app.post('/login', (req, res) => {
    UsuarioController.autenticar(req, res);
});

app.get('/logout', (req, res) => {
    UsuarioController.logout(req, res);
    res.redirect('/login'); 
    return;
});

app.get('/pessoas/imagem/:id_pessoa', PessoasController.getImagem);

app.post('/pessoas', upload.single('foto'), PessoasController.addPessoa);

app.get('/pessoas/edit/:id_pessoa', PessoasController.editPessoa);

app.post('/pessoas/edit', PessoasController.updatePessoa);

app.get('/pessoas/editar/:id_pessoa', PessoasController.editPessoa);

app.post('/pessoas/editar', PessoasController.updatePessoa);

app.post('/pessoas/editar/:id_pessoa', PessoasController.updatePessoa);

app.get('/pessoas/delete/:id_pessoa', PessoasController.deletePessoa);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});