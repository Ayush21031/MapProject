const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema(
    {
        chat_id: { type: String, required: true },
        message: { type: String, required: true },
        sender_id: { type: String, required: true },
        date_time: { type: String, required: true },
    }
)