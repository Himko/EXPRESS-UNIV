import express from 'express';
import bodyParser from 'body-parser';

import flights from './fakeDB.js'; // 



let fakeFlights = [...flights] // фейк бд что бы не устанавливать локально на пк
let lastFakeIDDB = 4; // точно такой же фейк primaryID 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get(
    '/api/flights', (req, res) => res.status(200).json(fakeFlights)
);

app.get('/api/flights/:id', (req, res) => {
    const id = Number(req.params.id);

    const foundFlight = fakeFlights.find((flight) => flight.id === id);

    if(foundFlight) {
        return res.status(200).json(foundFlight)
    }
    else {
        return res.status(400).json({message: 'flight is not found'})
    }
});

app.post('/api/flights', (req,res) => {
    console.log(req.body)
    if(!req.body) {
        return res.sendStatus(400)
    }
   
    const newFlight = {id: ++lastFakeIDDB, ...req.body}
    fakeFlights.push(newFlight);

    res.status(200).json(newFlight)

})

app.listen(3000)