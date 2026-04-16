const mongoose = require('mongoose');

const mongoDB=mongoose.connect('mongodb://localhost:27017/hms');
mongoDB.then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB:',err);
});


module.exports = mongoDB;