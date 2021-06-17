var mysql = require('mysql')

function db(query) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'infinitedungeon'
    });
    
    return new Promise((resolve, reject) => { 
        connection.query(query, (error, result) => {
            if (error) {
                throw error;
            }else{
                connection.end();
                console.log("o valor do results e "+result.length)
                resolve(result.length) 
            }
        })
    })
}
module.exports = db