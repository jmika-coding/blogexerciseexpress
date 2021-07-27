import { getDatabaseConf, getMigrationDir } from "../configuration/configurationService"
import { Client } from "pg"
import { Middleware } from "typera-express"
import * as pg from "pg"
import { migrate } from "postgres-migrations"

export const getClient = () => {
  const client = new Client(getDatabaseConf())
  client.connect()
  return client
}

export const dbClient: Middleware.Middleware<{ client: pg.Client }, never> = async () =>
  Middleware.next({ client: getClient() })

export const runMigrations = () =>
  migrate({ client: getClient() }, getMigrationDir()).finally(() => getClient().end())
