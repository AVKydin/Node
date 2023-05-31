const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const users = [
    {name: 'vasya', age: 31, status: false},
    {name: 'petya', age: 30, status: true},
    {name: 'kolya', age: 29, status: true},
    {name: 'olya', age: 28, status: false},
    {name: 'max', age: 30, status: true},
    {name: 'anya', age: 31, status: false},
    {name: 'oleg', age: 28, status: false},
    {name: 'andrey', age: 29, status: true},
    {name: 'masha', age: 30, status: true},
    {name: 'olya', age: 31, status: false},
    {name: 'max', age: 31, status: true}
];

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const user = users[userId - 1];
    res.status(200).json(user)
})


app.post('/users', (req, res) => {
    const body = req.body
    users.push(body)
    res.status(201).json({
        message: 'User created!'
    })
})

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const updateUser = req.body;

    users[+userId] = updateUser;

    res.status(200).json({
        message: 'User updated!',
        data: users[+userId]
    })
})

app.delete('/users/:userId', (req, res)=>{
    const {userId} = req.params;

    users.splice(+userId, 1);

    res.status(200).json({
        message: 'User deleted!',
    })
})


app.get('/welcome', (req, res) => {
    console.log('WELCOME!!!');
    res.send('WELCOME!!!');
    // res.end();
})

const PORT = 5100;

app.listen(PORT, () => {
    console.log('Server OK ')
})