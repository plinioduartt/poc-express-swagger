import CustomSwagger from "../index";
import { SwaggerSetupRoute } from "../types";

export function SwaggerEndpoint(args: SwaggerSetupRoute) {
  return function (_target: any, _propertyKey: string, _descriptor: PropertyDescriptor): void {
    CustomSwagger.setEndpoint({
      tag: args.tag,
      url: args.url,
      method: args.method,
      summary: args.summary,
      description: args.description,
      body: args.body,
      // parameters: args.parameters,  // TODO: Arrumar
      // responses: args.responses  // TODO: Arrumar
    })
    console.log(`[SWAGGER] - Endpoint configured successfully ${args.method} - ${args.url}`)
  };
}

export function SwaggerModel() {
  return function (constructor: any): void {
    const instance = new constructor()
    const modelProperties = Object.keys(instance)
    console.log('instance', instance)
    console.log('modelProperties', modelProperties)
    let properties = {}
    for (let index = 0; index < modelProperties.length; index++) {
      const prop = modelProperties[index]
      properties[modelProperties[index]] = {
        [prop]: {
          type: typeof instance[prop], // TODO: Arrumar
        }
      }
    }
    console.log('properties => ', properties)
    CustomSwagger.setModel({
      [constructor.name]: {
        type: 'object', // TODO: Arrumar
        properties: properties
      }
    })
    console.log(`[SWAGGER] - Model configured successfully ${constructor.name}`)
  };
}

