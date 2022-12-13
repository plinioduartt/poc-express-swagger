import { Request, Response } from "express"
import { SwaggerEndpoint } from "../swagger/decorators"
import { CreateUserDto } from "./dtos"
import { User } from "./entities"
import { UsersRepository } from "./repositories"

export class UserController {
  constructor(private repository: UsersRepository) { }

  @SwaggerEndpoint({
    tag: 'Users',
    url: '/users',
    method: 'GET',
    summary: 'Este é um teste de listagem'
  })
  list(_req: Request, res: Response): Response<User[]> {
    const users = this.repository.list()
    return res.json(users)
  }

  @SwaggerEndpoint({
    tag: 'Users',
    url: '/users',
    method: 'POST',
    summary: 'Este é um teste de cadastro',
    body: CreateUserDto
  })
  create(req: Request<null, null, CreateUserDto>, res: Response): Response<void> {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'Informe um nome.' })
    this.repository.create(name)
    return res.end()
  }
}