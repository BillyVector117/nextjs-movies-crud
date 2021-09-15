import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    }
})

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema)
