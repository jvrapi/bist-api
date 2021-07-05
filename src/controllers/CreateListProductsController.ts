import { Request, Response } from 'express'
import { CreateListProductsService } from '../services/CreateListProductsService'

class CreateListProductsController {
  async handle(request: Request, response: Response) {
    const { listId, productId } = request.body
    const service = new CreateListProductsService()
    const listProducts = await service.execute(listId, productId)
    return response.status(201).json(listProducts)
  }
}

export { CreateListProductsController }
