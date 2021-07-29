import { getDatabaseConf, getMigrationDir } from "../configuration/configurationService"
import { Pool } from "pg"
import { Middleware } from "typera-express"
import * as pg from "pg"
import { migrate } from "postgres-migrations"

export const getPool = () => new Pool(getDatabaseConf())

export const dbClient: Middleware.Middleware<{ pool: pg.Pool }, never> = async () =>
  Middleware.next({ pool: getPool() })

export const runMigrations = async () => {
  const client = await getPool().connect()
  migrate({ client: client }, getMigrationDir())
  client.release()
}
