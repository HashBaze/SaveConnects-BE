require("dotenv").config();

import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;

const databaseURL = `${process.env.DATABASE_URL}`;

async function mongodbConnect() {
  try {
    await mongoose.connect(databaseURL);
    console.log("Database connected successfully");

    app.get("/", (req, res) => {
      res.send("Website is running");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

mongodbConnect();
