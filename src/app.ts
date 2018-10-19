import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as methodOverride from 'method-override'
import * as morgan from 'morgan'
import * as swaggerUi from 'swagger-ui-express'

import { apiErrorHandler } from './middlewares/api-error-middleware'
import { RegisterRoutes } from './routes'

import './controllers/users-controller'

const app = express()
const swaggerDocument = require(`${__dirname}/swagger.json`)

// istanbul ignore next
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'))
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)
app.use(apiErrorHandler)

export default app
