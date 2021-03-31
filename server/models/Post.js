const { model, Schema} = require('mongoose');

const postSchema = new Schema({
    body: String,
    username: String,
    creationTime: String,
    likes:[{
        username: String,
        creationTime: String
    }],
    comments:[{
        username: String,
        body: String,
        creationTime: String
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]

});

module.exports = model('Post', postSchema);