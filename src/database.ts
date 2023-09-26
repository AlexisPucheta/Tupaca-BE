import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI || "";
export const dbConnection = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("database is connected"))
    .catch((e) => console.log(e));
};
