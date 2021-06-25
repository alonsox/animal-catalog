import { ConnectOptions } from 'mongoose';

export const dbConfig = {
  /** Connection uri for the database */
  uri: process.env.MONGODB_URI as string,

  /** Connection options for the DB */
  connectionOptions: <ConnectOptions>{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
};
