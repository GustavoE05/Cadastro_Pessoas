const Pessoa = require('../Models/PessoasModels');
let pessoas = [];
async function getPessoas(req, res){
    try{
        pessoas = await Pessoa.getPessoas();
        res.render('pessoas', {pessoas});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
function addPessoa(req, res){
    const {nome} = req.body;

}
module.exports = {getPessoas, addPessoa};