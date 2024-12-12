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

userRoute.put("/", (req, res) => {
    const { id, MarkBucks, UmerCoins } = req.body;
  
    try {
      // Read the current user data
      const userBuffer = fs.readFileSync('./data/users.json');
      const userData = JSON.parse(userBuffer);
      console.log(userData)
  
      userData.forEach((user) => {
        if (user.id === id) {
          user.MarkBucks += MarkBucks
          user.UmerCoins += UmerCoins
        }
      });
  
      // Write the updated data back to the file
      console.log(userData);
      fs.writeFileSync('./data/users.json', JSON.stringify(userData));
      res.send(userData);

    } catch (error) {
      console.log("Error updating user data", error);
      res.status(500).send({ message: 'Error updating user data', error });
    }
  });

userRoute.post("/", (req, res) => {

  const newUser = {
    id: crypto.randomUUID(),
    name: req.body.name,
    MarkBucks: 0,
    UmerCoins: 0,
    timestamp: Date.now()
  }

  try {
    const dataBuffer = fs.readFileSync("./data/users.json");
    const usersData = JSON.parse(dataBuffer);
    console.log(usersData)
    console.log("this is new user", newUser);

    usersData.push(newUser);

    console.log(usersData);


  } catch (error) {
    res.send(error)
  }
});
export default userRoute;