const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let users = [];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, userType: user.userType });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

app.post('/register', (req, res) => {
    const { username, password, userType } = req.body;
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        res.json({ success: false, message: 'Username already exists' });
    } else {
        users.push({ username, password, userType });
        res.json({ success: true });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
