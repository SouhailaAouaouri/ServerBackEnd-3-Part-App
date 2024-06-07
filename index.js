const express = require('express');
const app = express();
const port = process.env.Port || 5000;

const cors = require("cors")
app.use(cors())

//configuration les routes
require('./startup/routes')(app)
//configuration de la base de données
require('./startup/db')();
//Démarrage du serveur en écoutant sur le port configuré
const server=app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports= server;