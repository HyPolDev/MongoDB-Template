import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    favouriteBooks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
},
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model("User", UserSchema)

export default User