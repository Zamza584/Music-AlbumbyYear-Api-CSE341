const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Music Albums",
    description: "Purpose of api is to sort albums by year and display them to user."
  },
  host: "localhost:8001",
  schema: ["http"]

};

const outputFile = "./utils/swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../server.js"); // Your project's root file
  console.log("api doc found at: http://localhost:8001/api-docs/");
});
