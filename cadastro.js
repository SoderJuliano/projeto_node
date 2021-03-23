const db = require("./db");

function cadastro(name, password, eMail) {
    db(`INSERT INTO user (user_name, user_password, email) VALUES ("${name}", "${password}", "${eMail}")`);
}
module.exports = cadastro