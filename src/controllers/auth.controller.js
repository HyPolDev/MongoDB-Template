
import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "Credentials needed"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        if (!validEmail.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Format email invalid"
            })
        }

        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({
                succes: false,
                message: "Password between 6 and 20 characters"
            })
        }

        const passwordEncrypted = bcrypt.hashSync(password, 8)

        const newUser = await User.create({
            email: email,
            password: passwordEncrypted,
            name: name
        })

        return res.status(201).json({
            succes: true,
            message: "User created succesfully"
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "User couldn't be registered",
            error: error
        })
    }
}

export const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            res.status(400).json({
                succes: false,
                message: "Credentials needed"
            })
        }

        const user = await User.findOne({
            email: email
        })

        if (!user) {
            res.status(500).json({
                succes: false,
                message: "User not found",
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                succes: false,
                message: "User could not be loged in",

            })
        }

        //create token
        const token = jwt.sign({
            userId: user._id,
            roleName: user.role

        },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )

        res.status(200).json({
            succes: true,
            message: "User logged",
            data: user,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "User couldn't be logged in",
            error: error
        })
    }
}
