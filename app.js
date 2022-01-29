import express from 'express'
import ip from 'ip'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${ip.address()}:${port}`)
})