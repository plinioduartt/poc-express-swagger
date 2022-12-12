import CustomSwagger from "../index";
import { SwaggerSetupRoute } from "../types";

export function SetupSwaggerRoute(args: SwaggerSetupRoute) {
  return function (_target: any, _propertyKey: string, _descriptor: PropertyDescriptor) {
    CustomSwagger.setRoute({
      tag: args.tag,
      url: args.url,
      method: args.method,
      summary: args.summary,
      description: args.description,
      parameters: args.parameters,
      responses: args.responses
    })
    console.log(`[SWAGGER] - Path configured successfully ${args.method} - ${args.url}`)
  };
}

