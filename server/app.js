require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let api = require("./controllers/usercontroller");

sequelize.sync();
//sequelize.sync({force: true})
app.use(require("./middleware/headers"));
app.use(express.json());

//have endpoint of journal/practice
//send a response from that endpoint (this is a practice route)

app.use("/api", api);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
