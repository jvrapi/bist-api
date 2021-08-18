import request from 'supertest'
import { getCustomRepository } from 'typeorm'
import { app } from '../../src/app'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { connection } from '../../typeorm/connection'

describe('Request Get Product By Name', () => {
  beforeAll(async () => {
    await connection.connect()

    const productRepository = getCustomRepository(ProductsRepository)
    const product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to get product by name', async () => {
    const response = await request(app).get('/product/acu')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })
})
jest.setTimeout(30000)
