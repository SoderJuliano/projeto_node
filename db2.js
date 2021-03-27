var mysql = require('mysql')

function db2(query) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'infinitedungeon'
    });

    return connection.query(query, function(error, results, fields) {
        //let x = [];
        if (error) {
            throw error;
        } else {
            connection.end();
            console.log('executou!');
        }
    });
}

module.exports = db2