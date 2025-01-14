const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const cookieParser = require("cookie-parser");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(req?.body?.password, 10);
    console.log(passwordHash);
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passwordHash,
      age: age,
      gender: gender,
      photoUrl: photoUrl,
      about: about,
      skills: skills,
    });
    if (skills?.length > 10) {
      throw new Error("Skills cannot be greater than 10");
    }
    await user.save();
    console.log(
      req.body.firstName + " " + req.body.lastName + " " + "added successfully"
    );
    res.send(
      req.body.firstName + " " + req.body.lastName + " " + "added successfully"
    );
  } catch (err) {
    console.log("User cannot be added");
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log("created" + token);
      res.cookie("token", token);
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null);
  res.send("Logout Successful ! !");
});
module.exports = authRouter;
