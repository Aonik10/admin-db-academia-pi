import mongoose from "mongoose";
const { Schema, SchemaTypes, model, models } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        default: null,
        minLength: 8,
    },
    firstName: {
        type: String,
        default: "Alumno",
    },
    lastName: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: "https://iili.io/H4uyVZF.webp",
    },
    reffersCodes: {
        type: [String],
        default: null,
    },
    inscriptions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Inscription",
        },
    ],
});

const User = models?.User || model("User", userSchema);

export default User;
