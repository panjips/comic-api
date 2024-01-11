const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("../router/api"));

app.get("/api", (req, res) => {
  res.status(200).json({
    message: `Hello, welcome to this API ❤️`,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Running in port ${PORT} ❤️`);
});
