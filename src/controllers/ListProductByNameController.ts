import { Request, Response } from 'express'
import { ListProductByNameService } from '../services/ListProductsByNameService'

class ListProductByNameController {
  async handle(request: Request, response: Response) {
    const { name } = request.params
    const service = new ListProductByNameService()
    if (!name) {
      return response.status(400).json({ message: 'Missing informations' })
    }
    const product = await service.execute(name)
    return response.json(product)
  }
}

export { ListProductByNameController }
