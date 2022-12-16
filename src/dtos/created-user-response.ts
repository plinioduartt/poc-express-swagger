import { ApiProperty } from "../../swagger/decorators";

export class CreatedUserResponseDto {
  @ApiProperty()
  id!: number; // TODO: Revisitar

  @ApiProperty()
  name!: string; // TODO: Revisitar

  @ApiProperty()
  age!: number; // TODO: Revisitar
}