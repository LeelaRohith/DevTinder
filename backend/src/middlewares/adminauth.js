const adminauth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Admin is not authorized");
  } else {
    next();
  }
};
module.exports = { adminauth };
