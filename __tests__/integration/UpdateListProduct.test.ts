import request from 'supertest'
import { getCustomRepository } from 'typeorm'
import { app } from '../../src/app'
import { ListProduct } from '../../src/entities/ListProduct'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListProductsService } from '../../src/services/CreateListProductsService'
import { CreateListService } from '../../src/services/CreateListService'
import { connection } from '../../typeorm/connection'

describe('Request Update List Product', () => {
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
  it('should be able to update list product', async () => {
    const response = await request(app).put('/list-products').send({
      id: listProduct.id,
      productId: listProduct.productId,
      listId: listProduct.listId,
      amount: 5,
      price: null
    })

    expect(response.status).toBe(200)
    expect(typeof response.body).toBe('object')
    expect(response.body.price).toEqual(0)
  })
})
jest.setTimeout(30000)
