const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Init the middleware
app.use(express.json({ extended: false }));

// Connect the database
connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to Contact Keeper' }));

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
