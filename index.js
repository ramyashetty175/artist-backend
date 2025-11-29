const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3030

const configureDB = require('./config/db');
configureDB();

const artistCtlr = require('./app/controllers/artist-Controller');
const eventCtlr = require('./app/controllers/event-controller');

app.post('/api/artist', artistCtlr.create);
app.post('/api/event', eventCtlr.create);
app.get('/api/event', eventCtlr.list);
app.get('/api/event/:id', eventCtlr.show);

app.listen(port, () => {
    console.log("server is running on port "+port);
})
