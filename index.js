const mongoose = require('mongoose')
const { requireFolder } = require('folder-utils')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

exports.MongooseRepository = (modelsPath, options, debug = "false") => {
  mongoose.set('debug', debug)

  requireFolder(path.join(process.cwd(), isProduction ? 'build' : 'src' ,'repositories', modelsPath), '-model', { mode: isProduction ? 'js' : 'ts', inject: mongoose })
  
  mongoose
    .connect(process.env.MONGO_URI, options)
    .catch(err => console.log(err))

    return {
      _disconnect: async () => mongoose.disconnect(),
      _clear: async () => mongoose.connection.dropDatabase(),
      ...mongoose.models
    }
}
