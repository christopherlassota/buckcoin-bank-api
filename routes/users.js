import express from "express";
import fs from "fs"
import crypto from "crypto";

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
    try {
        const userBuffer = fs.readFileSync('./data/users.json');
        const userData = JSON.parse(userBuffer);
        res.send(userData)
    } catch (error) {
        console.log("Error getting user Data", error)
        res.send(error)
    }
});

export default userRoute;