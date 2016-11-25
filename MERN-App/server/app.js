import express from "express";
import bodyParser from "body-parser";

import { serverPort } from '../etc/config.json';

import * as db from "./utils/DataBaseUtils.js";

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// RESTful api handlers
app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});