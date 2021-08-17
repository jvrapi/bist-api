import { createConnection, getConnection } from 'typeorm'
import { Product } from '../entities/Product'
import { products } from './data/products'
import { resolve } from 'path'
import dotenv from 'dotenv'

interface JsonData {
  name: string
}
dotenv.config({
  path: resolve(__dirname, '..', '..', '.env.test')
})

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

async function createTestConnection() {
  const entities = resolve(
    __dirname,
    '..',
    '..',
    'src',
    'entities',
    '*.{js,ts}'
  )

  const migrations = resolve(
    __dirname,
    '..',
    '..',
    'src',
    'database',
    'migrations',
    '*.{js,ts}'
  )
  return await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [entities],
    migrations: [migrations],
    // synchronize: true,
    logging: false,
    dropSchema: true,
    migrationsRun: true
  })
}

async function clearDatabase() {
  const connection = getConnection()
  const entities = connection.entityMetadatas
  for await (const entity of entities) {
    await connection.query(`DROP TABLE IF EXISTS ${entity.tableName} CASCADE`)
  }
  await connection.query('DROP TABLE IF EXISTS migrations')
}

async function closeConnection() {
  getConnection().close()
}

export {
  connectToDatabase,
  createProducts,
  createTestConnection,
  closeConnection,
  clearDatabase
}
