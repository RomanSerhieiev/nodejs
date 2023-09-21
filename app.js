const express = require('express');
const { usersService } = require('./services/users.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    const users = await usersService.get();

    if (users.length <= 0) {
        return res.status(422).json('Користувачів не знайдено.');
    }

    res.json(users);
});

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const users = await usersService.get();

    const user = users.find(user => user.id === +userId);

    if (!user) {
        return res.status(422).json(`Користувача з ID ${userId} не знайдено.`);
    }

    res.json(user);
});

app.post('/users', async (req, res) => {
    const { name, age } = req.body;

    if (!name || name.length <= 3) {
        return res.status(400).json('Ім\'я повинно бути більше 3 символів.');
    }

    if (!age || age <= 0) {
        return res.status(400).json('Вік має бути більше 0.');
    }

    const users = await usersService.get();

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        age
    };

    users.push(newUser);
    await usersService.post(users);
    res.status(201).json(`Користувача ${newUser.name} створено`);
});

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const users = await usersService.get();

    const index = users.findIndex(user => user.id === +userId);

    if (index === -1) {
        return res.status(422).json(`Користувача з ID ${userId} не знайдено.`);
    }

    users.splice(index, 1);
    await usersService.post(users);
    res.sendStatus(204);
});

app.patch('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, age } = req.body;

    if (name && name.length <= 5) {
        return res.status(400).json('Ім\'я повинно бути більше 3 символів.');
    }

    if (age && age <= 0) {
        return res.status(400).json('Вік має бути більше 0.');
    }

    const users = await usersService.get();

    const user = users.find(user => user.id === +userId);

    if (!user) {
        return res.status(422).json(`Користувача з ID ${userId} не знайдено.`);
    }

    if (name) user.name = name;
    if (age) user.age = age;

    await usersService.post(users);
    res.status(201).json(`Користувача ${user.name} оновлено.`);
});

const PORT = 13579;

app.listen(PORT, () => {
    console.log(`Server has successfully started on PORT ${PORT}`);
});