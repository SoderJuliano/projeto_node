const express = require("express");
const app = express();
const fetch = require("node-fetch")
const cadastro = require("./cadastro.js")
const path = require("path");
const db = require("./db.js")


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const router = express.Router();

app.get('/cadastro', function(req, res, next) {

    const body = [];

    req.on("data", (chunk) => {
        //console.log(chunk);
        body.push(chunk);
    });

    req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        this.name = JSON.parse(parsedBody).name;
        this.password = JSON.parse(parsedBody).password;
        this.email = JSON.parse(parsedBody).email;
    });
    // console.log(body);
    if (this.name != null && this.name != "undefined" && this.name != '') {
        cadastro(this.name, this.password, this.email);

    } else {
        console.log('else')
    }
    res.send("I'm a post method");
    res.end();
})

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

router.get('/sobre', function(req, res) {
    res.sendFile(path.join(__dirname + "/sobre.html"));
});

router.get('/user', async function(req, res) {
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