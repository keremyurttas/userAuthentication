import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/index.js";
const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URI, {}).then(() => {
  console.log("DB connected");
});
mongoose.connection.on("error", (error) => {
  console.log("database connection error: ", error);
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
