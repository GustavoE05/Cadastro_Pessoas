const UsuarioModel = require('../Models/UsuariosModels');
let usuarios = [];  

     function login(req, res){
        res.render('login');  
}

    function cadastro(req, res){
        res.render('cadastro');
}

    async function autenticar(req, res){
        if(req.body.email && req.body.senha){
            let resp = await UsuarioModel.autenticar(req.body.email, req.body.senha);
            if(resp.length > 0){
                req.session.user ={
                    id_usuario: resp[0].id_usuario,
                    nome: resp[0].nome,
                    email: resp[0].email,
                };
                res.redirect('/pessoas');
            }else{
                res.redirect('/login');
            }

    }
}

    async function cadastrar(req, res){
        const {nome, email, senha} = req.body;
        if(nome && email && senha){
            const usuario = new UsuarioModel(null, nome, email, senha);
            await usuario.cadastrar();
            res.redirect('/login');
            }else{
                res.redirect('/cadastro');
        }
}

    async function logout(req, res){
        delete req.session.user;
        res.redirect('/login');
}

module.exports = {login, autenticar, cadastro, cadastrar, logout};