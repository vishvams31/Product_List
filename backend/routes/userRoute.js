const express = require('express')
const verifyUserToken = require('../middleware/authMiddleware')
const usersController = require('../controller/userController')

const usersRouter = express.Router();

usersRouter.get("/", usersController.getUser)
usersRouter.get("/userObject", usersController.userFromToken)
usersRouter.get("/:username", usersController.getUserProfile)

module.exports = usersRouter;