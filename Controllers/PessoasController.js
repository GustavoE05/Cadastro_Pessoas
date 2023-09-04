const Pessoa = require('../Models/PessoasModels');
const fs = require('fs');
let pessoas = [];

async function getPessoas(req, res) {
    try {
        const pessoas = await Pessoa.listarPessoas();
        res.render('pessoas', { pessoas, pessoa: {} }); // Defina pessoa como um objeto vazio inicialmente
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    function addPessoa(req, res){
    const {nome, dataNascimento, cpf, rg, email} = req.body;
    const foto = req.file;

    const pessoa = new Pessoa(null, nome, dataNascimento, cpf, rg, email, foto);
    pessoa.salvar();
    res.redirect('/pessoas');
}

    async function deletePessoa(req, res){
    if(await Pessoa.deletePessoa(req.params.id_pessoa)){
        msg={
          msg: req.session.msg = 'Pessoa deletada com sucesso!',
          class: 'alert-success'
        }
        req.session.msg; 
        res.redirect('/pessoas'); 
    }else{
        msg={
            msg: req.session.msg = 'Erro ao deletar pessoa!',
            class: 'alert-danger'
        }
        req.session.msg;
        res.redirect('/pessoas');   
    
    }
}

async function editPessoa(req, res){
    const id_pessoa = req.params.id_pessoa;
    const pessoa = await Pessoa.getPessoa(id_pessoa);
    if(pessoa){
        res.render('editar', {pessoa});
    }else{
        res.status(404).json({message: 'Pessoa não encontrada!'});
    }
}


async function updatePessoa(req, res){ 
    const id_pessoa = req.params.id_pessoa; // Pegue o ID da URL
    const {nome, dataNascimento, cpf, rg, email} = req.body;
    const pessoa = new Pessoa(id_pessoa, nome, dataNascimento, cpf, rg, email, null);   
    try{
        await pessoa.editarPessoa();
        res.redirect('/pessoas');
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

    async function getImagem(req, res){
    const id_pessoa = req.params.id_pessoa;
    const pessoa = await Pessoa.getPessoa(id_pessoa);
    if(pessoa){
        const imagempath = pessoa.foto;

        fs.readFile(imagempath, (err, data) => {
            if(err){
                res.status(500).json({message: err.message});
            }else{
                const base64 = data.toString('base64');
                const img = 'data:image/png;base64,' + base64;
                res.send(`<img src="${img}" alt="Imagem de ${pessoa.nome}">`);
            }
        });

    }else{
        res.status(404).json({message: 'Pessoa não encontrada!'});
    }
}

module.exports = {getPessoas, addPessoa, deletePessoa, getImagem, editPessoa, updatePessoa,};