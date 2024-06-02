const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = {
    コードマスター改: 'codemaster0827',
};

const easyScores = [];
const normalScores = [];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] === password) {
        res.json({ token: 'dummy-token', username });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        return res.status(409).json({ message: 'ユーザー名が既に存在します。' });
    }

    users[username] = password;
    res.status(201).json({ message: 'ユーザー登録に成功しました。' });
});

app.get('/api/scores/easy', (req, res) => {
    const sortedScores = easyScores.sort((a, b) => b.score - a.score).slice(0, 5);
    res.json(sortedScores);
});

app.post('/api/scores/easy', (req, res) => {
    const { username, score } = req.body;
    easyScores.push({ username, score });
    res.status(201).json({ message: 'Score added successfully' });
});

app.get('/api/scores/normal', (req, res) => {
    const sortedScores = normalScores.sort((a, b) => b.score - a.score).slice(0, 5);
    res.json(sortedScores);
});

app.post('/api/scores/normal', (req, res) => {
    const { username, score } = req.body;
    normalScores.push({ username, score });
    res.status(201).json({ message: 'Score added successfully' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
