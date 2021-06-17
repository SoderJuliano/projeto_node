const express = require("express");
const app = express();
const fetch = require("node-fetch")
const consulta = require("./consulta.js")
const path = require("path");
const db = require("./db.js")
var cors = require('cors');
const db2 = require("./db2.js");
const char = require("./char")

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("middleware")
    app.use(cors())
    next();
});

app.post('/character', function(req, res, next){
    console.log("character "+req.body)

    if(req.body.name == null || req.body.name == 'undefined'){
        console.log("error name empty")
        res.end()
    }else{
        char(req.body.id).then((value, err) =>{
            res.send(value)
            res.end()
        })
    }
})


// novo cadastro

app.post('/cadastro', function (req, res, next) {
    console.log("cadastro "+req.body.name)

    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
   
    // console.log(body);
    if (name != null && name != "undefined" && name != '') {
        consulta(name, password, email).then((value, err) => {
            console.log("retorno d aconsulta " + value)
            if (err) {
                res.send("Falha na comunicação")
                res.end()
            }
            if (value == "true") {
                console.log("cadastro realizado")
                res.send({"status":"true"})
                res.end();
            } else {
                res.send({"status":"false"})
                res.end();
            }
        })
    } else {
        console.log('else fim')
        res.end();
    }
})

//logar usuario

app.post('/login', function (req, res, next) {
    if (req.body.name != null && req.body.name != "undefined" && req.body.name != '') {
        db2("SELECT * from users WHERE name='" + req.body.name + "' and password='" + req.body.password + "'")
            .then((value, err) => {
                if (err) {
                    res.send("Falha na comunicação")
                    res.end()
                }
                    console.log(value)
                if (value[0] == null || value[0] == 'undefined') {
                    console.log("not registred")
                    res.send("false");
                    res.end()
                } else {
                    console.log(`loggend as ${value[0].name}`)
                    res.send(value[0]);
                    res.end()
                }
            })
    } else {
        console.log('else ' + req.body.name)
        res.end()
    }
});

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

router.get('/sobre', function (req, res) {
    res.sendFile(path.join(__dirname + "/sobre.html"));
});
// get teste
router.get('/user', async function (req, res) {
    db("SELECT * from user").then((value, err) => {
        if (err) {
            res.send("Falha na comunicação")
        }
        res.send(value[0].user_name);
    })
});

app.use('/', router);

app.listen(process.env.port || 5000);

console.log("server rodando");