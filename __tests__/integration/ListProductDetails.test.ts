import request from 'supertest'
import { getCustomRepository } from 'typeorm'
import { app } from '../../src/app'
import { ListProduct } from '../../src/entities/ListProduct'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListProductsService } from '../../src/services/CreateListProductsService'
import { CreateListService } from '../../src/services/CreateListService'
import { connection } from '../../typeorm/connection'

describe('Request Get List Product Details', () => {
  let listProduct: ListProduct

  beforeAll(async () => {
    await connection.connect()

    const createListService = new CreateListService()
    const list = await createListService.execute()

    const productRepository = getCustomRepository(ProductsRepository)
    const product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)

    const createListProductsService = new CreateListProductsService()
    listProduct = await createListProductsService.execute(list.id, product.id)
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to get list product details', async () => {
    const response = await request(app).get(
      `/list-products/${listProduct.listId}`
    )
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })
})
jest.setTimeout(30000)
