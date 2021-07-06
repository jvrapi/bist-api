const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
module.exports = {
  type: process.env.BD_TYPE,
  url: process.env.DATABASE_URL,
  extra: {
    ssl: true
  },
  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
    entitiesDir: rootDir + '/entities',
  },
}
