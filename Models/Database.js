const mysql = require('mysql2/promise');

async function connect(){
    try{
    return await mysql.createConnection({
        host: '177.153.50.144',
        user: 'gustavo',
        password: 'BZFsBdRo80XVlrBoWuOD',
        database: 'gustavo'
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