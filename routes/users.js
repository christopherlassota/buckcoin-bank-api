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

userRoute.put("/:id", (req, res) => {
    const { id, MarkBucks, UmerCoins } = req.body;
  
    try {
      // Read the current user data
      const userBuffer = fs.readFileSync('./data/users.json');
      const userData = JSON.parse(userBuffer);
  
      // Find the user by ID and update the values
      const user = userData.find((user) => user.id === id);
  
      if (user) {
        // Update MarkBucks and UmerCoins for the found user
        user.MarkBucks += MarkBucks;
        user.UmerCoins += UmerCoins;
  
        // Write the updated data back to the file
        fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2), 'utf8');
  
        // Respond with success
        res.send({ message: 'User updated successfully', user });
      } else {
        // Respond if user not found
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      console.log("Error updating user data", error);
      res.status(500).send({ message: 'Error updating user data', error });
    }
  });

export default userRoute;