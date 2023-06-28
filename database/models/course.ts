import mongoose from "mongoose";
const { Schema, SchemaTypes, model, models } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        unique: [true, "Title already exists!"],
        required: [true, "Title is required!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
    },
    livePrice: {
        type: Number,
        required: [true, "Price is required!"],
    },
    onDemandPrice: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
    },
    onSale: {
        type: Number,
        default: 0,
    },
    isLive: {
        type: Boolean,
        default: true,
    },
    isOnDemand: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    duration: {
        type: String,
        default: null,
    },
    inscriptions: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Inscription",
        },
    ],
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
