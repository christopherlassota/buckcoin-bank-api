import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/users.js";

console.log(process.env.BACKEND_URL)

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(cors()); // fix cors error
app.use(express.json()); // add body to req.body

// Mock user data
let users = [
    { id: 1, name: 'User 1', value: 0 },
    { id: 2, name: 'User 2', value: 0 },
    { id: 3, name: 'User 3', value: 0 },
  ];

app.use("/users", userRoute);


app.get("/", (req, res) => {
    res.send("Welcome to the buckcoins server");
});

app.listen(PORT, () => {
    console.log(`Server running at ${process.env.BACKEND_URL}${process.env.PORT}`)
});