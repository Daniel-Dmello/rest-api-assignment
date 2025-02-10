const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = []; // store users

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Bad Request" });
    }

    const user = {
        id: uuidv4(),
        name,
        email
    };

    users.push(user);
    return res.status(201).json(user);
});


app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json(user);
});


app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).json({ error: "Not Found" });
    }

    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Bad Request" });
    }

    user.name = name;
    user.email = email;
    
    return res.status(200).json(user);
});


app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Not Found" });
    }

    users.splice(index, 1);
    return res.status(204).send();
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
