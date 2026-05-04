import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    token: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    }
});


tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Token", tokenSchema);