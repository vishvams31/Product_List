const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
const cors = require('cors')
// const path = require('path')

app.use(cors())

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to MongoDb")
}).catch((err) => {
    console.log(err);
})
app.use(express.json())

app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.listen(8080, () => {
    console.log("Backend server is running on 8080")
})