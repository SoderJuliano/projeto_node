const express = require("express");
const app = express();
const fetch = require("node-fetch")
const cadastro = require("./cadastro.js")
const path = require("path");
const db = require("./db.js")
var cors = require('cors')

const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("middleware")

    app.use(cors())
    next();
});


// novo cadastro

app.post('/cadastro', function(req, res, next) {

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
        console.log(this.name)
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

//logar usuario

app.post('/login', function(req, res, next) {
    console.log("in login")
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
        console.log(this.name + " on end")

        if (this.name != null && this.name != "undefined" && this.name != '') {
            db("SELECT * from user WHERE user_name='" + this.name + "' and user_password='" + this.password + "'")
                .then((value, err) => {
                    if (err) {
                        res.send("Falha na comunicação")
                        res.end()
                    }
                    console.log(`loggend as ${ value[0].user_name}`)
                    res.send(value[0]);
                    res.end()
                })
        } else {
            console.log('else' + this.name)
            res.end()
        }
    });
})


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

router.get('/sobre', function(req, res) {
    res.sendFile(path.join(__dirname + "/sobre.html"));
});
// get teste
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