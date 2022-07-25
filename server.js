require("dotenv").config()
const PORT = process.env.PORT || 4000

const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

app.use("/files", require("./fileRouter"))

app.listen(PORT, ()=>{
    console.log(`Connection Success at PORT ${PORT}`)
}
)
