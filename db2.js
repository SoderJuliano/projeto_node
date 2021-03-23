var mysql = require('mysql')

const dbuser = async function(query) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'infinitedungeon'
    });

    connection.connect();

    let re;
    connection.query(query, function(error, results, fields) {
        if (error) throw error;
        re = results[0].user_name;
        console.log('re: ' + re)
    })

    connection.end();
    return re;
}

module.exports = { dbUser }