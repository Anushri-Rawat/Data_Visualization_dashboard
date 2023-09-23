const Data = require("./models/statsModel");
const sampleData=require("./utils/sampleData")
require("dotenv").config();
const connectDB=require("./config/db");

connectDB();

const importData = async () => {
  try {
    await Data.deleteMany();
    await Data.insertMany(sampleData);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
importData();