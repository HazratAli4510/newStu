import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    classRoll: String
})

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema)