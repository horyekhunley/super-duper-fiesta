import express from 'express'
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'
import Response from './src/domain/response.js'
import logger from './src/util/logger.js'
import HttpStatus from './src/controller/patient_controller.js'
import patientRoutes from './src/routes/patient_route.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, '', 'Patient API is running'))
})

app.use('/api/v1/patients', patientRoutes)

app.all('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, '', 'This route does not exist'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  logger.info(`Server running on port ${ip.address()}:${port}`)
})