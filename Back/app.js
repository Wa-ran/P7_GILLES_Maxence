const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const depts = require('./routes/gpm_depts');
const articles = require('./routes/articles');

// const path = require('path');

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// // Parser pour exploiter les données plus facilement
app.use(bodyParser.json());

// app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/user', userRoutes);
app.use('/depts', depts);
app.use('/articles', articles);
// app.use((req, res) => {
//   res.json({ user: 'Votre requête a bien été reçue !' }); 
// });
// app.use('/api/sauces', saucesRoutes);

module.exports = app;