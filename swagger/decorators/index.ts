import 'reflect-metadata'
import CustomSwagger from "../index";
import { SwaggerSetupRoute, ValueTypes } from "../types";

export function ApiTag(name: string): ClassDecorator {
  return function (target: any) {
    Object.defineProperty(target.constructor.prototype, 'tag', {
      get:() => name
    })
    return target
  };
}

export function ApiGetEndpoint(args: SwaggerSetupRoute): MethodDecorator {
  return function (target: any, _propertyKey: string | symbol, _descriptor: PropertyDescriptor): void {
    if (!args.tag) {
      args.tag = target.constructor.prototype.tag
    }

    console.log('target no ApiGetEndpoint', target.constructor.prototype.tag)
    CustomSwagger.setEndpoint({
      ...args,
      method: 'GET',
      // parameters: args.parameters,  // TODO: Arrumar
      // responses: args.responses  // TODO: Arrumar
    })
    console.log(`[SWAGGER] - GET Endpoint configured successfully ${args.method} - ${args.url}`)
  };
}

export function ApiPostEndpoint(args: SwaggerSetupRoute): MethodDecorator {
  return function (target: any, _propertyKey: string | symbol, _descriptor: PropertyDescriptor): void {
    if (!args.tag) {
      args.tag = target.constructor.prototype.tag
    }

    CustomSwagger.setEndpoint({
      ...args,
      method: 'POST',
      // parameters: args.parameters,  // TODO: Arrumar
      // responses: args.responses  // TODO: Arrumar
    })
    console.log(`[SWAGGER] - POST Endpoint configured successfully ${args.method} - ${args.url}`)
  };
}

export function ApiProperty(): PropertyDecorator {
  return (target: any, key: string | symbol): void => {
    const schema = target.constructor.name
    const propType = Reflect.getMetadata('design:type', target, key).name;
    const schemaType = typeof target.constructor.prototype
    const mapper = {
      "string": 'string',
      "number": 'integer',
      "bigint": 'integer',
      "boolean": '',
      "symbol": '',
      "undefined": '',
      "object": 'object',
      "function": ''
    }
    const mappedSchemaType = mapper[schemaType]
    CustomSwagger.setSchema(schema, {
      type: mappedSchemaType as ValueTypes,
      properties: {
        [key]: {
          type: propType.toLowerCase(),
        }
      }
    })
  }
}
