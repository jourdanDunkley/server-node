import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import * as entities from '../entities/index';

export default async () => {
    const dbConfig: ConnectionOptions = {
        port: 5432,
        logging: false, 
        type: 'postgres',
        host: process.env.DB_HOST, 
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        entities: Object.values(entities),
        synchronize: true
    };              
        
    return createConnection(dbConfig);
}