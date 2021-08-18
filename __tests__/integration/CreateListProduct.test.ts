import request from 'supertest'
import { getCustomRepository } from 'typeorm'
import { app } from '../../src/app'
import { List } from '../../src/entities/List'
import { Product } from '../../src/entities/Product'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListService } from '../../src/services/CreateListService'
import { connection } from '../../typeorm/connection'

describe('Request Create List Product', () => {
  let product: Product
  let list: List

  beforeAll(async () => {
    await connection.connect()

    const createListService = new CreateListService()
    list = await createListService.execute()

    const productRepository = getCustomRepository(ProductsRepository)
    product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to create a new list products', async () => {
    const response = await request(app).post('/list-products').send({
      listId: list.id,
      productId: product.id
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})
jest.setTimeout(30000)
