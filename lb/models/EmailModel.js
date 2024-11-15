import mongoose from "mongoose";


const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
})

const Email = mongoose.models.Email || mongoose.model("Email", EmailSchema);

export default Email;