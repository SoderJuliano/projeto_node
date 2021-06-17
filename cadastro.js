const db2 = require("./db2");

function cadastro(name, password, eMail) {
    db2(`INSERT INTO users (name, password, email) VALUES ("${name}", "${password}", "${eMail}")`)

}
module.exports = cadastro