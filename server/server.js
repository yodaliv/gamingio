const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

// function rawBody(req, res, next) {
// 	req.setEncoding('utf8');

// 	var data = '';

// 	req.on('data', function (chunk) {
// 		data += chunk;
// 	});

// 	req.on('end', function () {
// 		req.rawBody = data;
// 		next();
// 	});
// }
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(cors());

// app.use(
//   express.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf;
//     },
//   })
// );

app.use(bodyParser.json({ type: '*/*' }));

// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTION, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-Width, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// app.use(rawBody);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
