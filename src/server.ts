import { app } from './app'
import './database'
import { UpdateProductsMiddleware } from './middlewares/UpdateProductsMiddleware'

const port = process.env.PORT || 3333

app.use(UpdateProductsMiddleware)

app.listen(+port, () => {
  console.log(`🏃 Running Server on port ${port} `)
})
