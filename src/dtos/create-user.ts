import { ApiProperty } from "../../swagger/decorators";

export class CreateUserDto {
  @ApiProperty({ example: 'Plinio Duarte' })
  name!: string; // TODO: Revisitar

  @ApiProperty()
  age!: number; // TODO: Revisitar
}