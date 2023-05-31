const express = require("express");
const app = express();
const connectMongoDb = require("./DB/connection");
const cors = require("cors");

//swagger for api documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = process.env.PORT || 8000;
app.use(express.json({ extended: false }));
app.use(cors({ origin: "*", credentials: true }));

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/albums", require("./routes/albums"));

connectMongoDb();
app.listen(port, console.log("connected to server http://localhost:" + port));


//initial routes ...

//project is going to be about music and getting albums from a specific year. I will use spotify api to hopefully do this.
