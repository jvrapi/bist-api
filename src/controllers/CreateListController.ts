import { Request, Response } from 'express'
import { CreateListService } from '../services/CreateListService'

class CreateListController {
  async handle(request: Request, response: Response) {
    const createListService = new CreateListService()
    const list = await createListService.execute()
    return response.status(201).json(list)
  }
}

export { CreateListController }
