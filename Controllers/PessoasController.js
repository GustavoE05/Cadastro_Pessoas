const Pessoa = require('../Models/PessoasModels');
let pessoas = [];

async function getPessoas(req, res) {
    try {
        const pessoas = await Pessoa.listarPessoas();
        res.render('pessoas', { pessoas, pessoa: {} }); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    function addPessoa(req, res){
    const {nome, dataNascimento, cpf, rg, email} = req.body;
    const foto = req.file.filename;

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
        res.locals.layout = 'layouts/default/editar';
        res.render('editar', {pessoa});
    }else{
        res.status(404).json({message: 'Pessoa não encontrada!'});
    }
}


async function updatePessoa(req, res){ 
    const id_pessoa = req.params.id_pessoa;
    const {nome, dataNascimento, cpf, rg, email} = req.body;
    const foto = req.file.filename;
    const pessoa = new Pessoa(id_pessoa, nome, dataNascimento, cpf, rg, email, foto);   
    try{
        await pessoa.editarPessoa();
        res.redirect('/pessoas');
    }catch(err){
        res.status(500).json({message: err.message});
    }
} 

module.exports = {getPessoas, addPessoa, deletePessoa, editPessoa, updatePessoa};