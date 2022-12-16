import { name, version } from '../package.json'
import { TypesMapper } from './helpers'
import { CustomSwaggerOptions, SwaggerSetup, SwaggerSetupSchema, SwaggerSetupRoute, SwaggerTag, SwaggerParameter, SwaggerResponse } from './types'

class CustomSwagger {
  private document: CustomSwaggerOptions = {
    openapi: '3.0.0',
    explorer: true,
    info: {
      title: name,
    },
    version,
    servers: [],
    tags: [],
    paths: {},
    components: { schemas: {} }
  }

  public getDocument(args: SwaggerSetup) {
    this.document.info.description = args.description
    this.document.servers = args.servers
    console.log(this.document) // TODO: Remover isso
    return this.document
  }

  public setEndpoint(route: SwaggerSetupRoute): void {
    this.setTag(route.tag!)

    const getBody = (body: any) => ({
      required: true, // TODO: Fazer ficar flexível
      content: {
        [body.name]: {
          schema: {
            $ref: `#/components/schemas/${body.name}`
          }
        }
      }
    })

    const responses: SwaggerResponse = {}
    route.responses?.forEach((response) => {
      Object.assign(responses, {
        ...responses,
        [response.status]: {
          description: response.description,
          content: response.schema! ? {
            [response.type! ?? 'application/json']: {
              schema: {
                type: TypesMapper(typeof response.schema),
                $ref: `#/components/schemas/${response.schema?.name}`,
              }
            }
          } : undefined
        }
      })
    })

    this.document.paths = {
      ...this.document.paths,
      [route.url]: {
        ...this.document.paths[route.url],
        [route.method!.toLocaleLowerCase()]: {
          tags: [route.tag],
          summary: route.summary,
          description: route.description,
          requestBody: route.body ? getBody(route.body) : null,
          parameters: route.parameters ? route.parameters.map((param): SwaggerParameter => {
            return {
              name: param.name,
              in: param.in,
              description: param.description ?? '',
              required: param.required ?? true,
              explode: param.explode ?? false,
              schema: {
                type: param.type,
                items: {
                  type: param.type
                }
              }
            }
          }) : [],
          responses
        }
      },
    }
  }

  public setSchema(name: string, schema: SwaggerSetupSchema): void {
    if (!this.document.components.schemas[name]) {
      this.document.components.schemas = {
        ...this.document.components.schemas,
        [name]: {
          ...this.document.components.schemas[name],
          ...schema
        }
      }
    } else {
      this.document.components.schemas[name].properties = {
        ...this.document.components.schemas[name].properties,
        ...schema.properties
      }
    }
  }

  public setTag(name: string) {
    if (!this.document.tags.some(item => item.name === name)) {
      this.document.tags.push({ name })
    }
  }

  public updateTags(defaultTag: string, tag: string) {
    const paths = Object.keys(this.document.paths)
    paths.forEach(path => {
      const methods = Object.keys(this.document.paths[path])
      methods.forEach(method => {
        const methodObj = this.document.paths[path][method]
        const indexToUpdate = methodObj.tags.indexOf(undefined)
        if (indexToUpdate !== -1) {
          methodObj.tags[indexToUpdate] = tag
          Object.assign(methodObj, {
            ...methodObj,
            tags: methodObj.tags
          })
        }
      })
    })
    this.document.tags.splice(this.document.tags.indexOf((item: SwaggerTag) => item.name === defaultTag))
    this.document.tags = this.document.tags.filter(item => item.name !== undefined)
    this.document.tags.push({ name: tag })
  }
}

export default new CustomSwagger()

