const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const register = require("./routes/register");
const login = require("./routes/login");
const me = require("./routes/me");
const cards = require("./routes/cards");
const profile = require("./routes/profile");
const logger = require("./middlewares/logger");



app.use(express.json());
// communication between client in port 3000 and server in port 8000
app.use(cors()) //Open To all

// route to /api/*
app.use(logger);
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/me", me);
app.use("/api/cards", cards);
app.use("/api/profile", profile);


mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("Mongodb connected"))
    .catch(() => console.log("Cannot connect to Mongodb"));

app.listen(port, () => console.log(`server start on port ${port}`));