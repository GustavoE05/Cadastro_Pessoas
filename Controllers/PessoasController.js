const Pessoa = require('../Models/PessoasModels');
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
    const {nome} = req.body;

    const pessoa = new Pessoa(null, nome, null, null, null, null, null);
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
module.exports = {getPessoas, addPessoa, deletePessoa};