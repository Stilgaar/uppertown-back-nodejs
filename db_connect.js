const mongoose = require('mongoose');

const protocolMongo ="mongodb";
const hostMongo = "localhost";
const portMongo = "27017";
const dbname = "updownstreet";

const DB_URI =  "mongodb+srv://jquievreux:Erin25012017@cluster0.a56uw.mongodb.net/Updownstreet" 
// ${protocolMongo}://${hostMongo}:${portMongo}/${dbname}`;

mongoose.connect(DB_URI).then(()=>{
console.log("connected to : "+DB_URI);
})