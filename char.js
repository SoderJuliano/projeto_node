const db2 = require("./db2");

function consulta(id) {
    return new Promise((resolve, reject) => { 
        db2(`SELECT * from characters WHERE user_id="${id}";`).then((value, err) => {
            console.log("value "+value)
            if (err) {
                resolve("Falha na comunicação")
            }
            resolve(value)
        })
    })
}
module.exports = consulta