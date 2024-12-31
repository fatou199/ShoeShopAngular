import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    role: { type: String, enum: ['admin', 'client'], default: 'user', required: true },
})

const User = mongoose.model("User", UserSchema);

export default User;