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