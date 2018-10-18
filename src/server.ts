import app from './app'

const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT
console.log(`Starting server on port ${PORT}...`)
app.listen(PORT)
