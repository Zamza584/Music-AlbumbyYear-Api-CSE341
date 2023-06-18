const options = {
  openapi: "3.0.0",
  autoBody: true
};

const swaggerAutogen = require("swagger-autogen")(options);

const doc = {
  info: {
    version: "1.0.0",
    title: "My API CSE-341",
    description: "Purpose of api is to sort albums by year and display them to user."
  },
  servers: [
    {
      url: "https://album-by-year-api.onrender.com/",
      description: "main server"
    },
    {
      url: "http://localhost:8000/",
      description: "the other server"
    }
  ],
  consumes: [],
  produces: [],
  host: "localhost:8000/",
  basePath: "",
  schema: ["https"],

  definitions: {
    users: {
      firstName: "any",
      lastName: "any",
      email: "any@gmail.com",
      password: "anyany"
    },
    updateUsers: {
      firstName: "Manuel",
      lastName: "Zamalloa",
      email: "zam@gmail.com",
      password: "anyany"
    },
    albumData: {
      albumName: "any",
      albumArtist: "any",
      albumRelease: "any",
      albumLink: "link",
      albumTTracks: "num",
      albumImage: "any",
      user_id: "id number"
    }
  }
};

const outputFile = "./utils/swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../server.js"); // Your project's root file
  console.log("api doc found at: http://localhost:8000/api-docs/");
});
