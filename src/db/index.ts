import mongoose from 'mongoose';
import { dbConfig } from './db.config';

/** `connectDB :: ConnectionOptions -> ConnectionUri -> void -> void ` */
const executeConnection = (
  options: mongoose.ConnectOptions,
  uri: string,
) => () => {
  mongoose.connect(uri, options);

  const db = mongoose.connection;
  db.on('error', () => {
    console.log('Could not connect to the DB :(');
  });

  db.on('connected', () => {
    console.log('Connected to DB succesfully :)');
  });
};

export const connectDB = executeConnection(
  dbConfig.connectionOptions,
  dbConfig.uri,
);

export * from './db.config';
