const mongoose = require('mongoose');

async function configureDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to DB");
    } catch(err) {
        console.log(err);
        console.log("error occured to DB");
    }
}

module.exports = configureDB;
