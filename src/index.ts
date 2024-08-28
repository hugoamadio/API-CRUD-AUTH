import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import studentRoutes from './routes/student.routes'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

app.listen(PORT, ()=> console.log(`Server running... PORT: ${PORT}`))

//ROUTES

app.use("/user", userRoutes())

app.use("/auth", authRoutes())

app.use("/student", studentRoutes())