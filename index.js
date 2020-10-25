const express = require('express');
const cors = require('cors');
const monk = require('monk');
const db = monk(process.env.MONGO_URI || 'localhost/oceanday');
const sight = db.get('sights');
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json())
app.get('/', (req, res) => {
    res.json({
        message: "Hello world!"
    });
});

app.get('/data',(req, res, next) => {
    sight
        .find({})
        .then(sight => {
            res.json(sight);
        }) .catch(next);
});

app.post('/data',(req,res) => {
    const sighting = {
        lat : req.body.latitude,
        lon : req.body.longitude,
        time : new Date()
    }
        sight
        .insert(sighting)
        .then(res.json({
            message : "Plastic Sighting Reported!"
        }));
});

app.listen(5000, () => {
    console.log("Listening on http://localhost:5000");
});