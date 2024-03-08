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

export const addBookToFavourite = async (req, res) => {
    try {
        const bookId = req.body.bookId;
        // debe venir por el token
        const userId = req.body.userId;

        const user = await User.findOne(
            {
                _id: userId
            }
        )

        user.favouriteBooks.push(bookId);
        await user.save();

        res.status(200).json(
            {
                success: true,
                message: `Book added to user as favourite`,
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Book could not be added to user as favourite",
                error: error.message
            }
        )
    }
}