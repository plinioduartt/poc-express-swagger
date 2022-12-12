import { Request, Response } from "express"
import { SetupSwaggerRoute } from "../swagger/decorators"
import { User } from "./entities"
import { UsersRepository } from "./repositories"

export class UserController {
  constructor(private repository: UsersRepository) { }

  @SetupSwaggerRoute({
    tag: 'Users',
    url: '/users',
    method: 'GET',
    summary: 'Este é um teste de listagem',
    responses: {}
  })
  list(_req: Request, res: Response): Response<User[]> {
    const users = this.repository.list()
    return res.json(users)
  }

  @SetupSwaggerRoute({
    tag: 'Users',
    url: '/users',
    method: 'POST',
    summary: 'Este é um teste de cadastro',
    responses: {}
  })
  create(req: Request, res: Response): Response<void> {
    const { name } = req.body
    this.repository.create(name)
    return res.end()
  }
}