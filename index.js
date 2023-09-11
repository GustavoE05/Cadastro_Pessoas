const express = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const PessoasController = require('./Controllers/PessoasController');
const UsuarioController = require('./Controllers/UsuariosController');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const app = express();
const port = 2000;
const Database = require('./Models/Database');
const Pessoa = require('./Models/PessoasModels');
const uploadFile = multer({dest: './PUBLIC/Fotos'});

app.use(express.static(path.join(__dirname, 'PUBLIC')));
app.use(session({secret: 'l1nd4c4ch34d4'}));

const Storage = multer.diskStorage({
    filename: (req, file, cb) => {
        let nome = Date.now()+"-"+file.originalname;
        cb(null, nome);
    },
    destination: (req, file, cb) => {
        let path = './PUBLIC/Fotos';
        cb(null, path);
    }
});

let upload = multer({storage: Storage});

app.use((req, res, next) => {
    if(!req.session.user){
        if(req.url == '/login' || req.url == '/autenticar' || req.url == '/cadastro'){
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
app.get('/', (req, res) => {    
    res.render('home');
});

app.use(expressLayouts);

app.use(express.urlencoded({extended: true}));

//Rotas
app.get('/pessoas', PessoasController.getPessoas);
app.post('/pessoas', upload.single("foto"), PessoasController.addPessoa);
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
    if (req.session.user) {
        res.redirect('/pessoas'); 
        return;
    }
    UsuarioController.login(req, res);
});

app.post('/login', (req, res) => {
    UsuarioController.autenticar(req, res);
});

app.get('/logout', (req, res) => {
    UsuarioController.logout(req, res);
    res.redirect('/login'); 
    return;
});

app.get('/pessoas/edit/:id_pessoa', PessoasController.editPessoa);

app.post('/pessoas/edit/:id_pessoa', PessoasController.updatePessoa);

app.get('/pessoas/editar/:id_pessoa', PessoasController.editPessoa);

app.post('/pessoas/editar', PessoasController.updatePessoa);

app.post('/pessoas/editar/:id_pessoa', upload.single("foto"), PessoasController.updatePessoa);

app.get('/pessoas/delete/:id_pessoa', PessoasController.deletePessoa);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});