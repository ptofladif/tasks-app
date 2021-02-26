const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/user", (req, res) => {
    const user = new User(req.body);
    user.save().then( () => {
        res.status(201).send(user);
    }).catch( (err) => {
        res.status(400).send(err);
    });

})

app.post("/task", (req, res) => {
    const task = new Task(req.body);
    task.save().then( () => {
        res.status(201).send(task);
    }).catch( (err) => {
        res.status(400).send(err);
    });

})

app.get('/users', (req, res) => {
    User.find({}).then( (users) => {
        res.send(users);
    })
    .catch( (e) => {
        res.status(400).send(err);
    })
    ;
})

//replicar para um unico user por id

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then( (user) => {
        res.send(user);
    })
    .catch( (e) => {
        res.status(400).send(err);
    })
    ;
})

app.get('/tasks', (req, res) => {
    Task.find({}).then( (tasks) => {
        res.send(tasks);
    })
    .catch( (e) => {
        res.status(400).send(err);
    })
    ;
})

//replicar para um unico user por id

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
    .then( (task) => {
        res.send(task);
    })
    .catch( (e) => {
        res.status(400).send(err);
    })
    ;
})

app.listen(port, () => {
    console.log("O servidor iniciou");
})