import { SwaggerModel } from "../../swagger/decorators";

@SwaggerModel()
export class CreateUserDto {
  name: string
  age: number
}