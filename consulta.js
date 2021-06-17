const db = require("./db");
const cadastro = require("./cadastro.js");

function consulta(name, password, eMail) {
    return new Promise((resolve, reject) => { 
        db(`SELECT * from users WHERE name="${name}" and email="${eMail}";`).then((value, err) => {
            console.log("value "+value)
            if (err) {
                resolve("Falha na comunicação")
            }
            if(value==0){
                cadastro(name, password, eMail)
                console.log("cadastrou")
                resolve("true");
            }else{
                console.log("usuario ja cadastrado")
                resolved("false");
            }
        })
    })
}
module.exports = consulta