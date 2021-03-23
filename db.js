var mysql = require('mysql')

function db(query) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'infinitedungeon'
    });

    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
            connection.rollback(function () {
                reject(error)
            })
            }
            resolve(result)
        })
    })
}
module.exports = db