import cors from 'cors';
import express, { json, urlencoded } from 'express';

import swaggerUi from 'swagger-ui-express';
import CustomSwagger from '../swagger';
import { UsersRepository } from './repositories';
import { UserController } from './user-controller';

const port = 8000
const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded())

const userRepository = new UsersRepository()
const userController = new UserController(userRepository)
app.get('/users', userController.list.bind(userController))
app.post('/users', userController.create.bind(userController))

app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(
    CustomSwagger.getDefaultSwaggerDocument({
      description: 'Exemplo',
      servers: [
        {
          url: 'http://localhost:8000'
        }
      ]
    })
  )
);

app.listen(port, () => {
  console.log('listening on port', port)
})