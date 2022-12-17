import { Request, Response } from "express"
import { ApiGetEndpoint, ApiPostEndpoint, CommonApiTag } from "../swagger/decorators"
import { HttpStatus } from "../swagger/types"
import { CreatedUserResponseDto, CreateUserDto } from "./dtos"
import { User } from "./entities"
import { BadRequestException } from "./errors"
import { UsersRepository } from "./repositories"

@CommonApiTag('Users')
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
        schema: CreatedUserResponseDto,
      },
      {
        status: 400,
        description: 'error operation',
        schema: BadRequestException
      }
    ]
  })
  list(_req: Request, res: Response): Response<User[]> {
    const users = this.repository.list()
    return res.json(users)

  }

  @ApiPostEndpoint({
    tag: 'Optional unique tag test',
    url: '/users',
    summary: 'Este é um teste de cadastro',
    body: {
      schema: CreateUserDto
    },
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Success operation',
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