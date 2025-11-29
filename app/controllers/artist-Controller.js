const Artist = require('../models/artist-model');

const artistCtlr = {};

artistCtlr.create = async(req, res) => {
    const body = req.body;
    try {
        const artist = await Artist.create(body);
        if(!artist) {
          res.status(404).json({});
        }
        res.status(201).json(artist);
    } catch(err) {
       console.log(err);
       res.status(500).json({ error: 'Something went wrong!!!' });
    }
}

module.exports = artistCtlr;