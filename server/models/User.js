const { model, Schema} = require('mongoose');

const userSchema = new Schema({

    username: String,
    password: String, 
    email: String,
    creationTime: String
});

module.exports = model('User',userSchema);