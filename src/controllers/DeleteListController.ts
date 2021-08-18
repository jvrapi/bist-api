import { Request, Response } from 'express'
import { DeleteListService } from '../services/DeleteListService'

class DeleteListController {
  async handle(request: Request, response: Response) {
    const { listId } = request.body
    const service = new DeleteListService()
    const deleted = await service.execute(listId)
    return response.json(deleted)
  }
}

export { DeleteListController }
