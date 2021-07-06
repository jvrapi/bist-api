import { Request, Response } from 'express'
import { DeleteListsService } from '../services/DeleteListsService'

class DeleteListsController {
  async handle(request: Request, response: Response) {
    const listsId: string[] = request.body
    const service = new DeleteListsService()
    const deleted = await service.execute(listsId)
    return response.json(deleted)
  }
}

export { DeleteListsController }
