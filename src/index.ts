import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log("Server is running and DB is connected");
  })
  .catch((e) => console.log(e));
