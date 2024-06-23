const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        chat_id: { type: String, required: true },
        participants: [{ type: String, required: true }],
    }
)


exports.chatSchema = mongoose.model('chat', chatSchema);
