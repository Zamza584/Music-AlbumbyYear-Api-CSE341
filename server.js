const express = require("express");
const app = express();
const connectMongoDb = require("./DB/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

//swagger for api documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./utils/swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8000;

app
  .use(cookieParser())
  .use(express.static(__dirname + "/public"))
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors({ origin: "*", credentials: true }))
  .use("/", require("./routes/index"))
  .use("/users", require("./routes/users"))
  .use("/albums", require("./routes/albums"))
  .use("/login", require("./routes/login"))
  .use("/register", require("./routes/register"));

connectMongoDb();
app.listen(port, console.log("connected to server http://localhost:" + port));
