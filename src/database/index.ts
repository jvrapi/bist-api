import { createConnection, getConnection } from 'typeorm'
import { Product } from '../entities/Product'
import { products } from './data/products'
interface JsonData {
  name: string
}
async function connectToDatabase() {
  await createConnection()
  createProducts()
}

async function createProducts() {
  const connection = getConnection()
  const repository = connection.getRepository(Product)

  products.forEach(async (product: JsonData) => {
    const productAlreadyExists = await repository.findOne({
      name: product.name
    })
    if (!productAlreadyExists) {
      try {
        const newProduct = repository.create(product)
        await repository.save(newProduct)
      } catch (error) {
        console.log(error)
      }
    }
  })
}
connectToDatabase()
