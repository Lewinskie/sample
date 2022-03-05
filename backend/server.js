const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const bootcampsRoute = require("./routes/route");
const cors = require("cors");

//CONNECTION TO mongoDB
connectDB();

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api/v1/bootcamps", bootcampsRoute);

//PORT
const PORT = process.env.PORT;

//APP LISTENER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
