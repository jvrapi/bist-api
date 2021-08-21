import { createConnection } from 'typeorm'
import { updateProducts } from '../utils/typeorm/updateProducts'

async function connectToDatabase() {
  await createConnection()
  await updateProducts()
}
connectToDatabase()
