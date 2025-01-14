const validator = require("validator");
const validateSignUpData = (req) => {
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
  console.log(password);
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};
const validateEditProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isEditAllowed;
};
module.exports = { validateSignUpData, validateEditProfileData };
