import crypto from 'node:crypto'
import { CreateUserDto } from 'src/dtos'
import { User } from "src/entities"

export class UsersRepository {
  private users: User[] = []

  list(): User[] {
    return this.users
  }

  create(data: CreateUserDto): void {
    this.users.push({ id: crypto.randomUUID(), ...data })
  }
}

