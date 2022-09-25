const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const json_users = fs.readFileSync('src/users.json', 'utf-8');
let users = JSON.parse(json_users);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        users
    });

});

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
})

router.post('/new-entry', (req, res) => {
    const { name, lastname, age, email } = req.body;
    if (!name || !lastname || !age || !email) {
        res.status(400).send('Comple Todos los Campos');
        return;
    }

    let newUser = {
        id: uuidv4(),
        name,
        lastname,
        age,
        email,

    };

    users.push(newUser);

    const json_users = JSON.stringify(users);

    fs.writeFileSync('src/users.json', json_users, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
    users = users.filter(user => user.id != req.params.id);
    const json_users = JSON.stringify(users)
    fs.writeFileSync('src/users.json', json_users, 'utf-8');
    res.redirect('/');

});

module.exports = router;