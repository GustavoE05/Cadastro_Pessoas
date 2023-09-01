const Pessoa = require('../Models/PessoasModels');
const fs = require('fs');
let pessoas = [];

async function getPessoas(req, res){
    try{
        pessoas = await Pessoa.listarPessoas();
        res.render('pessoas', {pessoas});
    }catch(err){
        res.status(500).json({message: err.message});
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
        res.redirect('/pessoas');    
    }else{
        //res.status(500).json({message: 'Erro ao deletar pessoa!'});
        res.redirect('/pessoas');
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
module.exports = {getPessoas, addPessoa, deletePessoa, getImagem};