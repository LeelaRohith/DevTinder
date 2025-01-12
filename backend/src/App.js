const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
app.use(express.json()); //this middleware applies to every request
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (user) res.send(user);
    else res.send("User does'nt exist");
  } catch (err) {
    res.status(400).send("Error Occured");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user) res.send(user);
    else res.send("User does'nt exist");
  } catch (err) {
    res.status(400).send("Error Occured");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    if (data.skills.length > 10) {
      throw new Error("Update Not allowed");
    }
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error occured");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(3000, () => {
      console.log("Server is successfully listening on 3000");
    });
  })
  .catch((err) => {
    console.log("Database could not be connected");
  });
