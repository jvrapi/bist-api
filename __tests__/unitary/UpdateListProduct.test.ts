import { getCustomRepository } from 'typeorm'

import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListProductsService } from '../../src/services/CreateListProductsService'
import { CreateListService } from '../../src/services/CreateListService'
import { UpdateListProductsService } from '../../src/services/UpadateListProductsService'
import { connection } from '../../typeorm/connection'

describe('Update List Product', () => {
  let createListService: CreateListService
  let createListProductsService: CreateListProductsService

  let updateListProductsService: UpdateListProductsService

  beforeAll(async () => {
    createListService = new CreateListService()
    createListProductsService = new CreateListProductsService()

    updateListProductsService = new UpdateListProductsService()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to update list product ', async () => {
    // Creating list
    const list = await createListService.execute()
    expect(list).toHaveProperty('id')

    // Creating product
    const productRepository = getCustomRepository(ProductsRepository)
    const product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)
    expect(product).toHaveProperty('id')

    // Creating list products
    const listProducts = await createListProductsService.execute(
      list.id,
      product.id
    )
    expect(listProducts).toHaveProperty('id')

    // Update list product
    const updatedListProduct = await updateListProductsService.execute({
      id: listProducts.id,
      productId: listProducts.productId,
      listId: listProducts.listId,
      amount: 5,
      price: null
    })

    expect(updatedListProduct).toHaveProperty('id')
    expect(updatedListProduct).toHaveProperty('productId')
    expect(updatedListProduct).toHaveProperty('listId')
    expect(updatedListProduct).toHaveProperty('amount')
    expect(updatedListProduct).toHaveProperty('price')
    expect(updatedListProduct.price).toBeGreaterThanOrEqual(0)
    expect(updatedListProduct.amount).toBeGreaterThanOrEqual(1)
  })
})
jest.setTimeout(30000)
