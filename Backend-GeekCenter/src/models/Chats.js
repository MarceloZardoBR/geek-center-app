const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
    participants:[{
        type: Schema.Types.ObjectId,
        required: true
    }],
    messages:[{
        user_id: Schema.Types.ObjectId,
        message: String,
        time: Date
    }],
    status:{
        type: String,
        required: true,
    }
})

module.exports = model('Chat', ChatSchema);