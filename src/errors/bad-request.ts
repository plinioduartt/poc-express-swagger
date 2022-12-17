import { ApiProperty } from "../../swagger/decorators"

export class BadRequestException extends Error {
  @ApiProperty()
  public status: number

  @ApiProperty()
  public message: string

  constructor() {
    super('BadRequestException')
    this.status = 400
    this.message = 'this is an example'
  }
}