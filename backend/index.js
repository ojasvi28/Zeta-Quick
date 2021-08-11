const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
const port = process.env.PORT || 7000;
const Cryptr = require('cryptr');
const cryptr = new Cryptr(require("./config").secretCode);
const path = require("path")

const Proj = require("./models/proj")
const Users = require("./models/user")


const mongoose = require('mongoose');
const proj = require("./models/proj");
mongoose.connect(require("./config").dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => { console.log(err) })



app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use('/',express.static(path.join(__dirname,"/build")));

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
            let userId = require('short-uuid').generate()
            let _user = new Users({ email, password, userId })
            _user.save().then((r) => {
                res.json({ success: userId })
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
                res.json({ success: doc.userId })
            }
        }
    }).catch((err) => console.log(err))

})

app.post("/submit-proj", (req, res) => {
    const { zipUrl, userId, projId, readme, logo, title, description, author, techStack,fileSize,version } = req.body;
    Proj.findOne({ userId, projId }).then((doc) => {
        if (doc !== null) {
            res.json({ error: "Project Already Exist!" })
            return;
        }
        Users.findOne({ userId }).then((user) => {
            if (user === null) {
                res.json({ error: "User not loggedin!" })
                return;
            }

            let _newProj = new Proj({ zipUrl, userId, projId, readme, logo, title, description, author, techStack,fileSize,version })
            _newProj.save().then((r) => {
                res.json({ success: "Project Published" })
                return;
            }).catch((err) => {
                console.log(err)
                res.json({ error: "Server Error!" })
                return

            })
        }).catch((err) => {
            console.log(err)
            res.json({ error: "Server Error!" })
            return

        })
    }).catch((err) => {
        console.log(err)
        res.json({ error: "Server Error!" })
        return

    })

})

app.post("/update-proj", (req, res) => {
    const { zipUrl, userId, projId, readme, logo, title, description, author, techStack,fileSize,version } = req.body;
    Proj.findOne({ userId, projId }).then((doc) => {
        if (doc === null) {
            res.json({ error: "Project does not Exist!" })
            return;
        }
        Proj.findOneAndUpdate({ projId }, { zipUrl, userId, projId, readme, logo, title, description, author, techStack,fileSize,version }).then((user) => {
            res.json({success:"Project Updated"})
        }).catch((err) => {
            console.log(err)
            res.json({ error: "Server Error!" })
            return;
        })
    }).catch((err) =>{
        console.log(err)
        res.json({ error: "Server Error!" })
        return;
    })
})

app.get("/download/:projId",(req,res)=>{
    let {projId}= req.params
    console.log(projId)
    Proj.findOne({projId:projId}).then((doc)=>{
        console.log(doc)
        if(doc===null){
            res.send("File not found!")
            return;
        }
        Proj.findByIdAndUpdate({_id:doc._id},{totalDownloads:doc.totalDownloads+1}).then((d)=>{
            res.redirect(doc.zipUrl)
        }).catch((err)=>{
            res.send("Server Error!")
            return;
        })
    }).catch((err)=>{
        res.send("Server Error!")
    })
    
})

app.get("/all-projs", (req, res) => {
    Proj.find({}).then((doc) => res.json({ success: doc })).catch((err) => res.json({ error: "Server error!" }))
})


app.listen(port, () => {

    console.log("Server started", `App running on port ${port}`)

})