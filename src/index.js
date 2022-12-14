const express = require("express");
const serverless= require('serverless-http');
const Datastore = require("nedb");
//const PORT = process.env.PORT || 8080;


const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.send(data);
  });
});

app.post("/wipe", (request, response) => {
  database.remove({}, { multi: true }, function (err, numRemoved) {
});
  response.json(JSON.stringify(PORT));
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
module.exports.handler = serverless(app);
//const listener = app.listen(PORT, () => {
//    console.log("Proxy is listening on port: ", PORT)
//})
//const server = http.createServer(process.env.PORT || 3000);
//app.listen(3000, () => console.log("listening at 3000"));
