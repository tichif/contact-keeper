const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set a static folder
  app.use(express.static('client/build'));
  app.use('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
