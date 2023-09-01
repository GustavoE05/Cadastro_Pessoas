class Pessoa{
    constructor(id_pessoa, nome, dataNascimento, cpf, rg, email, foto){
        this.id_pessoa = id_pessoa;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.rg = rg;
        this.email = email;
        this.foto = foto;
    }
    static listarPessoas(){
        const db = require('./Database');
        let pessoas = db.query('SELECT * FROM pessoas');
        return pessoas;
    }
    salvar(){
        const db = require('./Database');
        let resp = db.query(`INSERT INTO pessoas (nome, dataNascimento, cpf, rg, email, foto) VALUES ('${this.nome}', '${this.dataNascimento}', '${this.cpf}', '${this.rg}', '${this.email}', '${this.foto}')`);
        console.log(resp);
    }
    static async deletePessoa(id_pessoa){
        const db = require('./Database');
        let resp = await db.query(`DELETE FROM pessoas WHERE id_pessoa=${id_pessoa}`);
        if(resp){
            if(resp.affectedRows > 0){
                return true;
            }else{
                return false;
            }
    }else{
        return false;
    }
    }
    static async getPessoa(id_pessoa){
        const db = require('./Database');
        let resp = await db.query(`SELECT * FROM pessoas WHERE id_pessoa=${id_pessoa}`);
        return resp[0];
    }
}
module.exports = Pessoa;