import { SwaggerOptions } from "swagger-ui-express"

export type SwaggerInfos = {
  title: string
  description?: string
}
export type SwaggerServer = {
  url: string
}
export type SwaggerTag = {
  name: string
}
export type SwaggerPath = {
  [key: string]: any;
}
export type SwaggerSetupRoute = {
  tag: string
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  summary: string
  description?: string
  parameters?: {
    name: string,
    in: 'header' | 'query' | 'path',
    description: string,
    required: boolean,
    explode: boolean,
    schema: {
      type: 'array' | 'apiKey' | 'integer' | 'oauth2' | 'object' | 'string',
      items: {
        type: string
      }
    }
  }[]
  responses?: {
    [key: string]: {
      description: string,
      content: {
        [key: string]: {
          schema: {
            $ref: string
          }
        },
      }
    }
  }
  requestBody?: {
    required: boolean
    description: string
    content: {
      [key: string]: {
        schema: {
          $ref: string
        }
      }
    }
  }
}
export type SwaggerSetup = {
  description: string
  servers: SwaggerServer[]
}
export type CustomSwaggerOptions = SwaggerOptions & {
  tags: SwaggerTag[],
  servers: SwaggerServer[],
  paths: SwaggerPath,
}