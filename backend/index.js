import express from 'express'
import cors from 'cors'
import healthcheck from './routes/healthcheck.js'
import reviews from './routes/reviews.js'

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/health', healthcheck)
app.use('/api/reviews', reviews)

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
