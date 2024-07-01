const express = require("express");
const { sequelize } = require("./models");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const alertRouter = require("./routes/alert");

const app = express();
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(alertRouter);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
