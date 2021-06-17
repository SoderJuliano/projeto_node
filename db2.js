var mysql = require('mysql')

function db2(query) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'infinitedungeon'
    });

    return new Promise((resolve, reject) => {
     connection.query(query, function(error, results, fields) {
       
        if (error) {
            throw error;
        } else {
            connection.end();
           // console.log('results! '+results);
            resolve(results)
        }
    });
})
}

module.exports = db2