import User from "../../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { dbConnection } from "../db.js";

const userSeeder = async () => {
    try {
        const connect = await dbConnection();
        console.log("Connected to MongoDB");

        const user = await User.create([
            {
                email: "admin@admin.com",
                password: bcrypt.hashSync('12345678', 8),
                role: "admin",
                name: "admin"
            },
            {
                email: "superadmin@superadmin.com",
                password: bcrypt.hashSync('12345678', 8),
                role: "superadmin",
                name: "superadmin"
            },
        ]);

        console.log("User created");
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect();
    }
};

userSeeder();