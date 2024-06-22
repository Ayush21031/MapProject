const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        participants: [{ type: String, required: true }],
    }
)
