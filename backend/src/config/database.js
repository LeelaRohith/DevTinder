const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:BswsuotxCN67JMT7@namastenode.pfxvd.mongodb.net/devTinder"
  );
};
module.exports = { connectDB };
