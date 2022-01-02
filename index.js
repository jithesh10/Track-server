const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://newuser10:Test123@cluster0.bpril.mongodb.net/Track?retryWrites=true&w=majority", { useNewURLParser: true, });

const addSchema = { title: String, description: String };

const initiatives = mongoose.model("initiatives", addSchema);

const userSchema = { username: String, password: String };

const users = mongoose.model("users", userSchema);

const projectSchema = { project: String, hours: Number, status: String,name: String};

const projects = mongoose.model("projects", projectSchema);

app.post("/insert", async (req, res) => {
    const project = new initiatives({ title: req.body.title, description: req.body.description });
    try {
        await project.save();
        res.send("Data Inserted");
    } catch (err) {
        console.log(err);
    }
});

app.get("/read", async (req, res) => {
    initiatives.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
});

app.post("/signup", (req, res) => {
    users.findOne({ username: req.body.username }, function (err, user) {
        if (err) console.log(err);
        if (user) {
            console.log("This has already been saved");
            res.send("Failed");
        } else {
            var user = new users({ username: req.body.username, password: req.body.password });
            user.save();
            console.log("Success");
            res.send("Success");
        }
    });
});

app.post("/login", async (req, res) => {
    users.findOne({ username: req.body.username, password: req.body.password }, function (err, data) {
        if (err)
            console.log(err);
        else if (data === null)
            res.send("Failure");
        else
            res.send(req.body.username);
    });

});

app.post("/add", async (req, res) => {
    const project = new projects({ project: req.body.project, hours: req.body.hours, status: req.body.status,name:req.body.name});
            try {
                await project.save();
                res.send("Data Inserted");
            } catch (err) {
                console.log(err);
            }
});

app.listen(3001, function () {
    console.log("In port 3001");
});