class UsuarioModel {
    constructor(id_usuario, nome, email, senha){
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha; 
    }
    static async autenticar(email, senha){
        const md5 = require('md5');
        let sql = `SELECT * FROM usuarios WHERE email='${email}' AND senha='${md5(senha)}'`;
        
        try{
            const db = await require('./Database').query(sql);
            return db;

          }catch(err){
            console.log(err);
            throw err;  
            }
    }
    async cadastrar(){
        const md5 = require('md5');
        let sql = `INSERT INTO usuarios (nome, email, senha) VALUES ('${this.nome}', '${this.email}', '${md5(this.senha)}')`;
        return await require('./Database').query(sql);
    }
}
module.exports = UsuarioModel;