import User from "../models/User.js"

export const getUsers = async (req, res) => {
    try {

        const users = await User.find({
            //still to do 
        })

        res.status(200).json({
            success: true,
            message: "Users retrieved successfuly",
            data: users
        })

    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Users could not be retrieved",
            error: error.message
        })

    }
}