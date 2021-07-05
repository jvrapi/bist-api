module.exports = {
  type: process.env.BD_TYPE,
  host: process.env.BD_HOST,
  database: process.env.BD_DATABASE,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  port: process.env.BD_PORT,

  entities: ['src/entities/*.{js,ts}'],
  migrations: ['src/database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities'
  }
}
