import * as mongoose from 'mongoose';
import { Repository } from 'graphql-api-scripts';

export function MongooseRepository (folder: string, options: mongoose.ConnectionOptions, debug?: boolean): Repository
