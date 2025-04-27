const dotenv = require("dotenv");
const express = require("express");
require("express-async-errors");
const connectDB = require("./api/utils/db.js");
const pkg = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const authRouter = require("./api/routes/auth.js");
const quizRouter = require("./api/routes/quiz.js")
const adminRouter = require("./api/routes/admin.js")


const app = express();

const http = require("http");

const server = http.createServer(app);

dotenv.config();
const { json, urlencoded } = pkg;

app.use(cors());



app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);


app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/admin", adminRouter);



const PORT = process.env.PORT || 5050;

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is currently listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
  }
};

start();