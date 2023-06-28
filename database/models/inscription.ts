import mongoose from "mongoose";
const { Schema, SchemaTypes, model, models } = mongoose;

const inscriptionSchema = new Schema(
    {
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: SchemaTypes.ObjectId,
            ref: "Course",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Inscription =
    models.Inscription || model("Inscription", inscriptionSchema);

export default Inscription;
