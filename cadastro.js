const db2 = require("./db2");

function cadastro(name, password, eMail) {
    db2(`INSERT INTO user (user_name, user_password, user_email) VALUES ("${name}", "${password}", "${eMail}")`);
}
module.exports = cadastro