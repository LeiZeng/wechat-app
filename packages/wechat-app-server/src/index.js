import restify from 'restify'
import swagger from 'swagger-restify'

import user from './apis/user'

const server = restify.createServer()
const port = 1108

server.pre(restify.pre.userAgentConnection())
server.use(restify.bodyParser())
server.use(restify.queryParser({ mapParams: false }))

restify.defaultResponseHeaders = function(data) {
    this.header('Access-Control-Allow-Origin', '*')
}

server.post(/^\/login/, user.login)
server.get(/^\/hello/, user.hello)

swagger.init(server, {
    swagger: '2.0', // or swaggerVersion as backward compatible
    info: {
      version: '1.0',
      title: 'Swagger 2.0 Restify example'
    },
    tags: [{
      name: 'example',
      description: 'Just an example API'
    }],
    host: 'localhost:' + port,
    apis: ['./src/apis/user.yml'],
    produces: [
      'application/json',
      'text/xml'
    ],
    consumes: [
      'application/json',
      'text/xml'
    ],
    // swagger-restify proprietary
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './dist'
});

server.listen(port)

console.log(`server start at ${port}`)