import { ApiProperty } from "../../swagger/decorators";

export class CreateUserDto {
  @ApiProperty()
  name!: string; // TODO: Revisitar

  @ApiProperty()
  age!: number; // TODO: Revisitar
}