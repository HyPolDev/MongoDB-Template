import { Router } from "express"
import { addBookToFavourite, getUsers } from "../controllers/user.controller.js"
import { auth } from "../middleware/auth.js"

const router = Router()

router.get("/getUsers", auth, getUsers)
router.get("/addBookToFavourite", auth, addBookToFavourite)

export default router