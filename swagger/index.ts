import { name, version } from '../package.json'
import { CustomSwaggerOptions, SwaggerSetup, SwaggerSetupSchema, SwaggerSetupRoute, SwaggerTag } from './types'

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
    paths: [],
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
        CreateUserDto: {
          schema: {
            $ref: `#/components/schemas/${body.name}`
          }
        }
      }
    })

    this.document.paths = {
      ...this.document.paths,
      [route.url]: {
        ...this.document.paths[route.url],
        [route.method!.toLocaleLowerCase()]: {
          tags: [route.tag],
          summary: route.summary,
          description: route.description,
          requestBody: route.body ? getBody(route.body) : null
          // parameters: route.parameters,  // TODO: Arrumar
          // responses: route.responses,  // TODO: Arrumar
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
       
        console.log(methodObj)
      })
    })
    this.document.tags.splice(this.document.tags.indexOf((item: SwaggerTag) => item.name === defaultTag))
    this.document.tags = this.document.tags.filter(item => item.name !== undefined)
    this.document.tags.push({ name: tag })
  }
}

export default new CustomSwagger()

