const app = require("express")();
const dataRoutes = require("./routes/data");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const connectDB=require("./config/db");

const { PORT } = process.env;

connectDB();

app.use(cors());
app.use("/api/v1/", dataRoutes);

app.get("/", (req, res) => res.send("Visualization api ready to use..."));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
