require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routers = require("./api/");

app.use(express.json());

app.use(
  express.static("public", {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Test API</h1><a href="/api/v1/users">Router</a>');
});

app.use("/", routers);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server is listening port ${port}...`));
