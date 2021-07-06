
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
module.exports = {
  type: process.env.BD_TYPE,
  host: process.env.BD_HOST,
  database: process.env.BD_DATABASE,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  port: process.env.BD_PORT,

  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
    entitiesDir: rootDir + '/entities',
  },
}
