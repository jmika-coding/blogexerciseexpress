import { DatabaseType } from "./databaseType"

export const getDatabaseConf = (): DatabaseType => ({
  user: String(process.env.POSTGRES_USER),
  host: String(process.env.POSTGRES_HOST),
  database: String(process.env.POSTGRES_DATABASE),
  password: String(process.env.POSTGRES_PASSWORD),
  port: Number(process.env.POSTGRES_PORT),
})

export const getMigrationDir = (): string => String(process.env.POSTGRES_MIGRATIONS_DIR)

export const getAppPort = (): number => Number(process.env.APP_PORT)
