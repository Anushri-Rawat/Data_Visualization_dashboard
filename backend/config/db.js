const mongoose= require("mongoose");
require("dotenv").config();

const { DATABASE_URL } = process.env;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports=connectDB;