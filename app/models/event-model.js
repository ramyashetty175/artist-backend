const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    geo: {
        type: [Number],   
        required: true
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist'
    }
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
