const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
// DB Config
// const db = require("./config/keys").mongoURI;

// MongoDB for Heroku Prod
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern", { useNewUrlParser: true })
// MongoDB for local
mongoose.connect("mongodb://localhost/mern", { useNewUrlParser: true })
.then(() => console.log("MongoDB successfully connected"))
.catch( err => console.log(err));

//////couldn't get MongoDB Atlas to work within an hour
// Connect to MongoDB
// mongoose
//   .connect(
//     process.env.MONGODB_URI, { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => 
//     console.log(err)
//     );

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
// //set static folder  
//   app.use(express.static("client/build"));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there


app.listen(port, () => console.log(`Server up and running on port ${port} !`));