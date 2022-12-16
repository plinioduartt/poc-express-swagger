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
export type SwaggerParameter = {
  name: string,
  in: 'header' | 'query' | 'path',
  description: string
  required: boolean
  explode: boolean
  schema: {
    type: ValueTypes
    items?: {
      type: ValueTypes
    }
  }
}
export type SwaggerResponse = {
  [key: string]: {
    description: string,
    content?: {
      [key: string]: {
        schema: {
          type: ValueTypes,
          $ref: string
          items?: {
            $ref: string
          }
        }
      }
    }
  }
}
export type SwaggerPath = {
  [key: string]: any
  parameters?: SwaggerParameter[]
  responses?: SwaggerResponse
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
  body?: any
  parameters?: {
    name: string
    type: ValueTypes
    description?: string
    in: 'path' | 'query' | 'header'
    required?: boolean
    explode?: boolean
    items?: {
      type: ValueTypes
    }
  }[]
  responses?: {
    status: number
    description?: string
    type?: 'application/json' | 'application/xml' | 'application/octet-stream' | 'application/x-www-form-urlencoded'
    schema?: any
  }[]
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
