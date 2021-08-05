const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
const port = process.env.PORT || 7000;
const Cryptr = require('cryptr');
const cryptr = new Cryptr(require("./config").secretCode);

const Proj = require("./models/proj")
const Users = require("./models/user")


const mongoose = require('mongoose')
mongoose.connect(require("./config").dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => { console.log(err) })



app.use(cors({
    origin: '*',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));



app.post("/login", (req, res) => {
    let { email, password } = req.body;
    console.log(email, password)
    let error = []
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !re.test(String(email).toLowerCase()))
        error.push("Invald Email Id")
    if (!password || password.length < 6)
        error.push("Invalid Password")

    if (error.length > 0) {
        res.json({ error: error.join(",") })
        return;
    }
    Users.findOne({ email }).then((doc) => {
        if (doc == null) {
            let _user = new Users({ email, password })
            _user.save().then((r) => {
                res.json({ success: cryptr.encrypt(`${email};&&;${password}`) })
            }).catch((err) => {
                console.log(err)
                res.json({ error: "Error Creating new User" })
            })
        }
        else {
            if (doc.password !== password) {
                res.json({ error: "Incorrect Password" })
                return;
            }
            else {
                res.json({ success: cryptr.encrypt(`${email};&&;${password}`) })
            }
        }
    }).catch((err) => console.log(err))

})

app.post("/submit-proj", (req, res) => {

})

app.post("/update-proj", (req, res) => {

})

app.get("/all-projs", (req, res) => {

})


app.listen(port, () => {

    console.log("Server started", `App running on port ${port}`)

})