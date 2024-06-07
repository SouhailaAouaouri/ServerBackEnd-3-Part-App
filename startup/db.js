const mongoose = require('mongoose');
const config = require('config');
module.exports=function (){
    mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true,family:4 })
        .then(() => console.log(`Connected to MongoDB ${config.get('db')}...`))
        .catch(err => console.error('Could not connect to MongoDB...',err));
}