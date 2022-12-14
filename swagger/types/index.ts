import { SwaggerOptions } from "swagger-ui-express"

export type ValueTypes = 'array' | 'apiKey' | 'integer' | 'oauth2' | 'object' | 'string'
export type Formats = 'binary' | 'datetime' | 'int64' | 'int32'
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
  [key: string]: any
  parameters?: {
    name: string,
    in: 'header' | 'query' | 'path',
    description: string
    required: boolean
    explode: boolean
    schema: {
      type: ValueTypes
      items: {
        type: string
      }
    }
  }[]
  responses?: {
    [key: string]: {
      description: string
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
    description?: string
    content: {
      [key: string]: {
        schema: {
          $ref: string
        }
      }
    }
  }
}
export type SwaggerComponent = {
  schemas: {
    [key: string]: {
      type: ValueTypes
      properties: {
        [key: string]: {
          type: ValueTypes
          format?: Formats
          example?: any
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
  tags: SwaggerTag[]
  servers: SwaggerServer[]
  paths: SwaggerPath
  components: SwaggerComponent
}
export type SwaggerSetupRoute = {
  tag?: string
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  summary: string
  description?: string
  body?: unknown
  response?: any
}
export type SwaggerSetupSchema = {
  type: ValueTypes
  properties: {
    [key: string]: {
      type: ValueTypes 
      format?: Formats
      example?: any
    }
  }
  [key: string]: any
}
