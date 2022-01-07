const mongoose = require('mongoose');

const protocolMongo = "mongodb";
const hostMongo = "localhost";
const portMongo = "27017";
const dbname = "updownstreet";

const DB_URI = `${protocolMongo}://${hostMongo}:${portMongo}/${dbname}`;
// process.env.MONGO_URL ||
mongoose.connect(DB_URI).then(() => {
    console.log(`**** Connected to : " + ${DB_URI} **** `);
})