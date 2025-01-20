const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); //this middleware applies to every request
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");

app.use("/", authRouter, profileRouter, requestRouter);

// app.get("/user", async (req, res) => {
//   try {
//     const user = await User.find({ emailId: req.body.emailId });
//     if (user) res.send(user);
//     else res.send("User does'nt exist");
//   } catch (err) {
//     res.status(400).send("Error Occured");
//   }
// });
// app.get("/feed", async (req, res) => {
//   try {
//     const user = await User.find({});
//     if (user) res.send(user);
//     else res.send("User does'nt exist");
//   } catch (err) {
//     res.status(400).send("Error Occured");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     if (data.skills.length > 10) {
//       throw new Error("Update Not allowed");
//     }
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update Not allowed");
//     }
//     await User.findByIdAndUpdate({ _id: userId }, data, {
//       runValidators: true,
//     });
//     res.send("User Updated Successfully");
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.id;
//   try {
//     await User.findByIdAndDelete({ _id: userId });
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(400).send("Error occured");
//   }
// });

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
