const express = require('express');
const mongoose = require('mongoose');
const emailRoutes = require('../routes/email');
const personRoutes = require('../routes/person'); 
const userRoutes = require('../routes/users'); 

require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/emergly', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Failed to connect to MongoDB:', err));

app.use('/email', emailRoutes);
app.use('/person', personRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
