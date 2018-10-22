import * as mongoose from 'mongoose'
import * as swaggerUi from 'swagger-ui-express'

import app from './app'

const DEFAULT_PORT = 3000
const DEFAULT_MONGODB_URI = 'mongodb://localhost:27017/demo-manager'

const PORT = process.env.PORT || DEFAULT_PORT
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI

// Add swagger documentation
const swaggerDocument = require(`${__dirname}/swagger.json`)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

console.log('Connecting to database...')
mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

console.log(`Starting server on port ${PORT}...`)
app.listen(PORT)
