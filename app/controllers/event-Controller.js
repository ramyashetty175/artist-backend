const axios = require('axios');
const Event = require('../models/event-model');

const eventCtlr = {};

eventCtlr.create = async(req, res) => {
    try {
        const { name, dateTime, address, artist } = req.body;
        const API_KEY = process.env.GEOCODE_API_KEY;
        const url = `https://geocode.maps.co/search?q=${address}&api_key=${API_KEY}`;
        const response = await axios.get(url);
        const result = response.data;
        if(!result || result.length === 0) {
           return res.status(404).json({ error: 'Invalid address or could not geocode' });
        } 
        const lat = parseFloat(result[0].lat);
        const lng = parseFloat(result[0].lon);

        const eventData = {
            name,
            dateTime,
            address,
            geo: [lat, lng],
            artist
        }
        const event = await Event.create(eventData);
        res.status(201).json(event);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

eventCtlr.list = async(req, res) => {
    try {
        const event = await Event.find();
        if(!event) {
           res.status(404).json({});
        }
        res.status(201).json(event);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong!!! '});
    }
}

eventCtlr.show = async(req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        if(!event) {
            res.status(404).json({});
        }
        res.status(201).json(event);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong!!! '});
    }
}

module.exports = eventCtlr;