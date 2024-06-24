const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema(
    {
        chat_id: { type: String, required: true },
        sender: { type: String, required: true },
        msg: { type: String, required: true },
        date_time: { type: String, required: true },
    }
    
)

exports.msgSchema = mongoose.model('msg', msgSchema);
