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
        default: 0,
    },
    onDemandPrice: {
        type: Number,
        required: [true, "Price is required!"],
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
    },
    tag: {
        type: String,
        default: null,
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
        // number of classes
        type: Number,
        default: null,
    },
    professor: {
        type: String,
        default: null,
    },
    liveDate: {
        // admite formato dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy
        type: String,
        match: [
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        ],
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
