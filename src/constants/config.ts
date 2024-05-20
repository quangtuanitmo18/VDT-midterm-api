import { config } from 'dotenv'

import fs from 'fs'
import path from 'path'
const env = process.env.NODE_ENV
const envFilename = `.env.${env}`
if (!env) {
  console.log(`You haven't provided the NODE_ENV environment variable (e.g., development, production)`)
  console.log(`Detect NODE_ENV = ${env}`)
  process.exit(1)
}
console.log(`Detect NODE_ENV = ${env},so the app will use the environment file ${envFilename}`)
if (!fs.existsSync(path.resolve(envFilename))) {
  console.log(`The environment file ${envFilename} was not found`)
  console.log(
    `Note: The app does not use the .env file. For example, if the environment is development, the app will use the .env.development file`
  )
  console.log(`Please create the ${envFilename} file and refer to the content in the .env.example file`)
  process.exit(1)
}
config({
  path: envFilename
})
export const isProduction = env === 'production'
export const envConfig = {
  clientUrl: process.env.CLIENT_URL as string,
  port: (process.env.PORT as string) || 4000,
  host: process.env.HOST as string,
  dbName: process.env.DB_NAME as string,
  dbNameTest: process.env.DB_NAME_TEST as string,
  dbUsername: process.env.DB_USERNAME as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbHost: process.env.DB_HOST as string,
  dbHostTest: process.env.DB_HOST_TEST as string,
  dbPort: process.env.DB_PORT as string
}
