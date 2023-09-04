import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes";
import passport from "./middleware/passport";

const express = require("express");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

// sequelize;
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
