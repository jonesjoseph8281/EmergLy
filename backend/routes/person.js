const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // Ensure this path is correct

// Route to add a person
router.post('/addPerson', async (req, res) => {
  const { name, email, relationship } = req.body;

  if (!name || !email || !relationship) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newPerson = new Person({ name, email, relationship });
    await newPerson.save();
    res.status(201).json({ message: 'Person added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add person', error });
  }
});

// Route to retrieve all people
router.get('/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve people', error });
  }
});

module.exports = router;
