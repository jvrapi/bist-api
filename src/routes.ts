import { Router } from 'express'
import { CreateListController } from './controllers/CreateListController'
import { ListListsController } from './controllers/ListListsController'
import { CreateListProductsController } from './controllers/CreateListProductsController'
import { UpdateListProductsController } from './controllers/UpdateListProductsController'
import { AddItemToListController } from './controllers/AddItemToListController'
import { ListProductDetailsController } from './controllers/ListProductDetailsController'
import { ListProductByNameController } from './controllers/ListProductByNameController'

const routes = Router()

const listListsController = new ListListsController()
const createListController = new CreateListController()
const createListProductsController = new CreateListProductsController()
const updateListProductsController = new UpdateListProductsController()
const addItemToListController = new AddItemToListController()
const listProductDetailsController = new ListProductDetailsController()
const listProductByNameController = new ListProductByNameController()

routes.get('/list/', listListsController.handle)
routes.post('/list', createListController.handle)
routes.post('/list-products', createListProductsController.handle)
routes.post('/list-products/add', addItemToListController.handle)
routes.put('/list-products', updateListProductsController.handle)
routes.get('/list-products/:id', listProductDetailsController.handle)
routes.get('/product/:name', listProductByNameController.handle)

export { routes }
