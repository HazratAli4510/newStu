import mongoose from "mongoose";

const connection = {}

async function dbConnect() {

    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect("mongodb+srv://testingone:qqnb0Y6TN4NOAg0q@cluster0.shbyr.mongodb.net/studentList?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    connection.isConnected = db.connections[0].readyState
}

export default dbConnect;