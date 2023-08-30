class UsuarioModel {
    constructor(id_usuario, nome, email, senha){
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha; 
    }
    static async autenticar(email, senha){
        const md5 = require('md5');
        let sql = `SELECT * FROM usuario WHERE email='${email}' AND senha='${senha}'`;
        const db = await require('./Database').query(sql);
        return db.query(sql);
    }
}
module.exports = UsuarioModel;