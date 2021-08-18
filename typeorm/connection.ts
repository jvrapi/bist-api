import { resolve } from 'path'
import dotenv from 'dotenv'
import { v4 as uuid } from 'uuid'
import { createDatabase, DbCredential, dropDatabase } from 'pg-god'
import { createConnection, getConnection } from 'typeorm'

dotenv.config({
  path: resolve(__dirname, '..', '.env.test')
})

class Connection {
  private databaseName = `schema_test_${uuid()}`

  private databaseConfig: Partial<DbCredential> = {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    port: 5432
  }

  private entities = resolve(__dirname, '..', 'src', 'entities', '*.{js,ts}')

  private migrations = resolve(
    __dirname,
    '..',
    'src',
    'database',
    'migrations',
    '*.{js,ts}'
  )

  async connect() {
    const connectionString = process.env.DATABASE_URL + this.databaseName
    await createDatabase(
      { databaseName: this.databaseName },
      this.databaseConfig
    )

    return await createConnection({
      type: 'postgres',
      url: connectionString,
      entities: [this.entities],
      migrations: [this.migrations],
      // synchronize: true,
      logging: false,
      dropSchema: true,
      migrationsRun: true
    })
  }

  async close() {
    await dropDatabase({ databaseName: this.databaseName }, this.databaseConfig)
    getConnection().close()
  }
}

const connection = new Connection()

export { connection }
