import { Request, Response } from 'express'
import { ListProductByNameService } from '../services/ListProductsByNameService'

class ListProductByNameController {
  async handle(request: Request, response: Response) {
    const { name } = request.params
    const service = new ListProductByNameService()
    const product = await service.execute(name)
    return response.json(product)
  }
}

export { ListProductByNameController }
