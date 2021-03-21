import userController from "../app/controller/user/user.controller";
import Authentication from "./middleware/auth";

const express = require("express");

const router = express.Router();

router.post("/sign-in", userController.signIn);

router.get("/sign-out", Authentication, userController.signOut);

router.post("/users", Authentication, userController.updateUserPassword);

router.get("/users", Authentication, userController.getUserDetail);

module.exports = router;
