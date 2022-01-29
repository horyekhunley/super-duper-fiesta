import express from 'express'
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'
import Response from './src/domain/response.js'
import logger from './src/util/logger.js'
import HttpStatus from './src/controller/patient_controller.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, '', 'Patient API is running'))
})
const port = process.env.PORT || 5000
app.listen(port, () => {
  logger.info(`Server running on port ${ip.address()}:${port}`)
})