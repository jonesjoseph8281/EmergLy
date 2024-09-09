const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    try {
        const { username, password, email, phonenumber } = req.body;
        const newUser = new User({ username, password, email, phonenumber });
        await newUser.save();
        res.status(201).send({ message: 'User signed up successfully!' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log("request received");
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid Password' });
        }

        res.status(200).send({ message: 'Login successful', username: user.username });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;