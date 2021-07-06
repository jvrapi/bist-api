import { Router } from 'express'
import { CreateListController } from './controllers/CreateListController'
import { GetListsController } from './controllers/GetListsController'
import { CreateListProductsController } from './controllers/CreateListProductsController'
import { UpdateListProductsController } from './controllers/UpdateListProductsController'
import { ListProductDetailsController } from './controllers/ListProductDetailsController'
import { ListProductByNameController } from './controllers/ListProductByNameController'

const routes = Router()

const getListsController = new GetListsController()
const createListController = new CreateListController()
const createListProductsController = new CreateListProductsController()
const updateListProductsController = new UpdateListProductsController()
const listProductDetailsController = new ListProductDetailsController()
const listProductByNameController = new ListProductByNameController()

routes.get('/list/', getListsController.handle)
routes.post('/list', createListController.handle)
routes.post('/list-products', createListProductsController.handle)
routes.put('/list-products', updateListProductsController.handle)
routes.get('/list-products/:id', listProductDetailsController.handle)
routes.get('/product/:name', listProductByNameController.handle)

export { routes }
