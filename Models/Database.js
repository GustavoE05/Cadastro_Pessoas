const mysql = require('mysql2/promise');

async function connect(){
    try{
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cadastro_pessoas'
    })
    }catch(err){
        console.log(err);
        throw err;
    }
}

async function query(sql){
    const connection = await connect();
    try{
        const [rows] = await connection.execute(sql);
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        await connection.end();
    }
}
module.exports = {query};