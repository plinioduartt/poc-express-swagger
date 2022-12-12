import crypto from 'node:crypto'
import { User } from "src/entities"

export class UsersRepository {
  private users: User[] = [
    {
      id: crypto.randomUUID(),
      name: 'Plinio Duarte',
    },
    {
      id: crypto.randomUUID(),
      name: 'Michael Jackson',
    }
  ]

  list(): User[] {
    return this.users
  }

  create(name: string): void {
    this.users.push({ id: crypto.randomUUID(), name })
  }
}

