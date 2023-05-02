import express from 'express';
import cors from 'cors';
import config from './config'
import { db } from './db'
db();
import plantsRouter from './routers/plants.router'
import usersRouter from './routers/user.router'
import errorHandler from "./middlewares/errorHandler"

const app = express();
app.use(express.json()) // expecting request to have a body in the format of json - parse it

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.get('/', (req, res) => {
    res.send("warehouse running")
})

app.use('/api/plants', plantsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
