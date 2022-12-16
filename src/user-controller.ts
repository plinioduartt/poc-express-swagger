import { Request, Response } from "express"
import { ApiDeleteEndpoint, ApiGetEndpoint, ApiPatchEndpoint, ApiPostEndpoint, ApiPutEndpoint, ApiTag } from "../swagger/decorators"
import { CreatedUserResponseDto, CreateUserDto } from "./dtos"
import { User } from "./entities"
import { UsersRepository } from "./repositories"

@ApiTag('Users')
export class UserController {
  constructor(private repository: UsersRepository) { }

  @ApiGetEndpoint({
    url: '/users',
    summary: 'Este é um teste de listagem',
    parameters: [
      {
        name: 'perPage',
        in: 'query',
        type: 'string'
      },
      {
        name: 'id',
        in: 'path',
        type: 'integer'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'success operation',
        type: 'application/json', // TODO: Melhorar isso
        schema: CreatedUserResponseDto,
      },
      {
        status: 400,
        description: 'Teste de erro',
      }
    ]
  })
  list(_req: Request, res: Response): Response<User[]> {
    const users = this.repository.list()
    return res.json(users)
  }

  @ApiPostEndpoint({
    tag: 'Teste',
    url: '/users',
    summary: 'Este é um teste de cadastro',
    body: CreateUserDto,
    responses: [
      {
        status: 201,
        description: 'success operation',
        schema: CreatedUserResponseDto,
      }
    ]
  })
  create(req: Request, res: Response): Response<void> {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'Informe um nome.' })
    this.repository.create(name)
    return res.end()
  }
}