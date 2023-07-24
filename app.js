var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var astronautesRouter = require("./routes/astronaute")

var app = express()

const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const mongoose = require("mongoose")
mongoose.connect("mongodb://mongo:27017/elevenlabs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connection success:'));


app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((err, req, res, next) => {
    console.error(err)

    if (err.status === 400) {
        return res.status(400).json({ error: err.message })
    }

    res.status(500).json({ error: err.message })
})

app.use("/astronautes", astronautesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development

    console.error(err)

    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    if (err.status === 400) {
        return res.status(400).json({ error: err.message })
    }

    // render the error page
    res.status(err.status || 500)
    res.json({ error: err.message })
})

module.exports = app
