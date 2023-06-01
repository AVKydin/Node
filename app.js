// ДЗ:
//
// Винести базу даних в json.file, при створенні записувати туда нових юзерів через fs, при видаленні - видаляти
// При створенні валідацію на імія і вік, імя повинно бути більше 3 символів, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є

const express = require('express');

const fs = require('node:fs');
const path = require('node:path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const users = require('./users.json');

const pathJoin = path.join('users.json')


app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    const user = users[userId - 1];

    if (!user) {
        res.status(404).json({
            message: 'юзер з таким id відсутній'
        })
    } else {
        res.status(200).json(user)
    }
})


app.post('/users', (req, res) => {
    const body = req.body

    if (body.name.length > 3 && body.age > -1 && typeof body.status === "boolean") {
        users.push(body)
        const usersStringify = JSON.stringify(users);
        fs.writeFile(pathJoin, usersStringify, (err) => {
            if (err) throw new Error(err.message)
        })
        res.status(201).json({
            message: 'User created!'
        })
    } else {
        res.status(404).json({
            message: 'імя повинно бути більше 3 символів, вік – не менше нуля та status - boolean'
        })
    }
})

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    users[+userId - 1] = req.body;
    console.log(req.body)
    if (+userId > users.length || +userId<1) {
        res.status(404).json({
            message: 'юзер з таким id відсутній'
        })
    } else {
        const usersStringify = JSON.stringify(users);
        fs.writeFile(pathJoin, usersStringify, (err) => {
            if (err) throw new Error(err.message)
        })
        res.status(200).json({
            message: 'User updated!',
            data: users[+userId]
        })
    }
})

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;
    if (+userId > users.length || +userId<1) {
        res.status(404).json({
            message: 'юзер з таким id відсутній'
        })
    } else {
        users.splice(+userId - 1, 1);
        const usersStringify = JSON.stringify(users);
        fs.writeFile(pathJoin, usersStringify, (err) => {
            if (err) throw new Error(err.message)
        })
        res.status(200).json({
            message: 'User deleted!',
        })
    }
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