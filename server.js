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

app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.use("/", require("./routes/login"));
app.use("/users", require("./routes/users"));
app.use("/albums", require("./routes/albums"));

connectMongoDb();
app.listen(port, console.log("connected to server http://localhost:" + port));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//initial routes ...

//project is going to be about music and getting albums from a specific year. I will use spotify api to hopefully do this.
