import request from 'supertest'
import { getCustomRepository } from 'typeorm'
import { app } from '../../src/app'
import { List } from '../../src/entities/List'
import { Product } from '../../src/entities/Product'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListService } from '../../src/services/CreateListService'
import { connection } from '../../typeorm/connection'

describe('Request Delete List', () => {
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
  it('should be able to delete a list', async () => {
    const response = await request(app).delete(`/list/${list.id}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('List deleted')
  })
})
jest.setTimeout(30000)
