import { name, version } from '../package.json'
import { CustomSwaggerOptions, SwaggerSetup, SwaggerSetupRoute } from './types'

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
    paths: []
  }

  public getDocument(args: SwaggerSetup) {
    this.document.info.description = args.description
    this.document.servers = args.servers
    console.log(this.document)
    console.log(this.document.paths[0])
    return this.document
  }

  public setEndpoint(route: SwaggerSetupRoute): void {
    if (!this.document.tags.some(item => item.name === route.tag)) {
      this.document.tags.push({ name: route.tag })
    }

    this.document.paths = {
      ...this.document.paths,
      [route.url]: {
        ...this.document.paths[route.url],
        [route.method.toLocaleLowerCase()]: {
          tags: [route.tag],
          summary: route.summary,
          description: route.description,
          parameters: route.parameters,
          responses: route.responses,
        }
      },
    }
  }
}

export default new CustomSwagger()

