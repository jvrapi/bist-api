import app from './app'
import { connectToDatabase } from './database'
connectToDatabase()
const port = process.env.PORT || 3333

app.listen(+port, () => {
  console.log(`🏃 Running Server on port ${port} `)
})
