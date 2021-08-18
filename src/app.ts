import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import { routes } from './routes'
import { errorMiddleware } from './middlewares/ErrorMiddleware'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.get('/', (req, res) => {
  res.send('Bist API')
})

app.use(errorMiddleware)

export { app }
