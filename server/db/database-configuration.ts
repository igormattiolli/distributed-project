import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const databaseConfiguration: PostgresConnectionOptions = {
  type: "postgres",
  host: "postgres",
  username: "postgres",
  password: "1234",
  port: 5432,
  database: "distributed",
  entities: [__dirname + "/../**/*.entity.{ts,js}"],
  synchronize: false,
};
