const express = require("express")
var cors = require('cors')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth.js")
const userRoute = require('./routes/users.js')
const movieRoute = require('./routes/movies.js')
const listRoute = require('./routes/lists.js')

const Port = process.env.PORT  || 8800

dotenv.config()


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected Successfully"))
.catch((err) => console.log(err))

}

app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)




app.listen(Port, () => {
    console.log("backend server is running at", Port);
})
 