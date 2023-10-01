import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const databaseConfiguration : PostgresConnectionOptions = {
    type : 'postgres',
    host : 'localhost',
    username : 'postgres',
    password : 'root',
    port: 5432,
    database : 'distributed',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize : false
}