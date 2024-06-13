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

import { Registry, collectDefaultMetrics, Counter } from 'prom-client'
import { HttpStatusCode } from 'axios'

config()

const app = express()

export const httpServer = createServer(app)

// create a registry to hold metrics
const registry = new Registry()

// enable default metrics like CPU usage, memory usage, etc.
collectDefaultMetrics({ register: registry })

// create a counter to track the number of requests
const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  registers: [registry],
  labelNames: ['method', 'path', 'status']
})

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  statusCode: HttpStatusCode.TooManyRequests
})
app.use(limiter)

app.use(helmet())
const corsOptions: CorsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))

const port = envConfig.port || 4000

app.use(express.json())
app.use('/users', usersRouter)

// expose the metrics for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  const result = await registry.metrics()
  res.send(result)
})

app.get('/test-lb', (req, res) => res.send('Your request is called to backend server 1\n'))

app.use(defaultErrorHandler)

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app
