import "dotenv/config.js"
import express from "express"
import cors from "cors"
import connectDB from "./api/v1/databases/connectDB.js"
import router from "./api/v1/routes/todos.route.js"
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use('/api/v1/tasks', router)

const PORT = process.env.PORT || 5000
connectDB()
app.listen(PORT, () => console.log(`listening on port ${PORT}`))