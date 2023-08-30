const UsuarioModel = require('../Models/UsuariosModels');
let usuarios = [];  

     function login(req, res){
        res.render('login');
}

    async function autenticar(req, res){
        if(req.body.email && req.body.senha){
            let resp = await UsuarioModel.autenticar(email, senha);
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

module.exports = {login, autenticar};