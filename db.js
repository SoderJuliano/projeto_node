var mysql = require('mysql')

function db(query) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'infinitedungeon'
    });

    return connection.query(query, function(error, results, fields) {
        //let x = [];
        if (error)
            throw error;
        else
        /* results.forEach(element => {
             x.push(element);
         });*/
            connection.end();
        console.log('executou!');
    });
}

module.exports = db