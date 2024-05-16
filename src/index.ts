import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { config } from 'dotenv'
import cors, { CorsOptions } from 'cors'

import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { envConfig, isProduction } from './constants/config'

import { createServer } from 'http'

config()

databaseService.connect().then(() => {
  databaseService.indexUsers()
})

const app = express()

const httpServer = createServer(app)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

app.use(helmet())
const corsOptions: CorsOptions = {
  origin: isProduction ? envConfig.clientUrl : '*'
  // origin: '*'
}
app.use(cors(corsOptions))

const port = envConfig.port || 4000

app.use(express.json())
app.use('/users', usersRouter)

app.get('/test-lb', (req, res) => res.send('Your request is called to backend server 1\n'))

app.use(defaultErrorHandler)

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
