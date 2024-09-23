import dotenv from "dotenv"
import express from "express"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import dealerRoutes from "./routes/dealerRoutes"

dotenv.config()
const app = express()

app.use(express.json())


app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/", dealerRoutes)




export default app