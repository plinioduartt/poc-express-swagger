import 'reflect-metadata'
import { TypesMapper } from '../../swagger/helpers';
import CustomSwagger from "../index";
import { SwaggerApiPropertyArgs, SwaggerSetupRoute, ValueTypes } from "../types";

export function CommonApiTag(tag: string): ClassDecorator {
  return function (target: any) {
    const metadataKey = target.name
    const defaultValue = Reflect.getMetadata(metadataKey, target.prototype)
    CustomSwagger.updateTags(defaultValue.tag, tag)
    return target
  };
}

export function ApiGetEndpoint(args: SwaggerSetupRoute): MethodDecorator {
  return function (target: any, _propertyKey: string | symbol, _descriptor: PropertyDescriptor): void {

    if (!args.tag) {
      const metadataKey = target.constructor.name
      args.tag = undefined
      Reflect.defineMetadata(metadataKey, { tag: undefined }, target)
    }

    CustomSwagger.setEndpoint({
      ...args,
      method: 'GET',
      parameters: args.parameters,
      responses: args.responses
    })
    console.info(`[SWAGGER] - GET Endpoint configured successfully - ${args.url}`)
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
      parameters: args.parameters,
      responses: args.responses
    })
    console.info(`[SWAGGER] - POST Endpoint configured successfully - ${args.url}`)
  };
}

export function ApiPutEndpoint(args: SwaggerSetupRoute): MethodDecorator {
  return function (target: any, _propertyKey: string | symbol, _descriptor: PropertyDescriptor): void {
    if (!args.tag) {
      args.tag = target.constructor.prototype.tag
    }

    CustomSwagger.setEndpoint({
      ...args,
      method: 'PUT',
      parameters: args.parameters,
      responses: args.responses
    })
    console.info(`[SWAGGER] - PUT Endpoint configured successfully - ${args.url}`)
  };
}

export function ApiPatchEndpoint(args: SwaggerSetupRoute): MethodDecorator {
  return function (target: any, _propertyKey: string | symbol, _descriptor: PropertyDescriptor): void {
    if (!args.tag) {
      args.tag = target.constructor.prototype.tag
    }

    CustomSwagger.setEndpoint({
      ...args,
      method: 'PATCH',
      parameters: args.parameters,
      responses: args.responses
    })
    console.info(`[SWAGGER] - PATCH Endpoint configured successfully - ${args.url}`)
  };
}

export function ApiDeleteEndpoint(args: SwaggerSetupRoute): MethodDecorator {
  return function (target: any, _propertyKey: string | symbol, _descriptor: PropertyDescriptor): void {
    if (!args.tag) {
      args.tag = target.constructor.prototype.tag
    }

    CustomSwagger.setEndpoint({
      ...args,
      method: 'DELETE',
      parameters: args.parameters,
      responses: args.responses
    })
    console.info(`[SWAGGER] - DELETE Endpoint configured successfully - ${args.url}`)
  };
}

export function ApiProperty(args?: SwaggerApiPropertyArgs): PropertyDecorator {
  return (target: any, key: string | symbol): void => {
    const schema = target.constructor.name
    const propType = Reflect.getMetadata('design:type', target, key).name;
    const schemaType = typeof target.constructor.prototype
    const mappedSchemaType = TypesMapper(schemaType)
    CustomSwagger.setSchema(schema, {
      type: mappedSchemaType as ValueTypes,
      properties: {
        [key]: {
          type: propType.toLowerCase(),
          example: args?.example
        }
      }
    })
  }
}
