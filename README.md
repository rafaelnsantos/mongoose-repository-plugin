# Mongoose Repository Plugin

Mongoose plugin for create-graphql-express

## Instalation

```sh
npm install --save mongoose-repository-plugin
npm install --save-dev @types/mongoose
```

## Configuration

Create file mongoose-repository.ts inside repositories folder.

```ts
import { MongooseRepository } from 'mongoose-repository-plugin'
import { Repository } from 'graphql-api-scripts'

export interface MongooseRepository extends Repository {
}

export default MongooseRepository('mongoose', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
```

|         | type                       | description                            |
|---------|----------------------------|----------------------------------------|
| folder  | string                     | required - models folder               |
| options | mongoose.ConnectionOptions | optional - mongoose connection options |
| debug   | boolean                    | optional - debug queries               |

Include mongoose in repositories.d.ts (it has to be the same name as the file created above without -repository)

```ts
import { MongooseRepository } from './mongoose-repository'

export interface Repositories {
  mongoose: MongooseRepository;
}
```

Set environment variable MONGO_URI in .env.dev eg.:
```
MONGO_URI="mongodb://user:password@host.mlab.com:11245/mydb"
```

## Creating Models

  Create user-model.ts inside the folder src/repositories/mongoose (-model is mandatory)

```ts
import { Mongoose, Document, Model } from 'mongoose'

interface User extends Document {
  uid: string;
  email: string;
}

export default ({ Schema, model }: Mongoose): Model<User> => {
  const schema = new Schema<UserModel>({
    uid: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }, { timestamps: true })

  schema.index({ uid: 'text' }, { unique: true })

  return model('User', schema)
}
```

Edit mongoose-repository.ts and include the created model in MongooseRepository interface

```ts
import { UserModel } from './mongoose/user-model'

export interface MongooseRepository extends Repository {
  User: UserModel;
}
```
