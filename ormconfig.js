const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

const ormConfig = {
  type: process.env.BD_TYPE,
  url: process.env.DATABASE_URL,


  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
    entitiesDir: rootDir + '/entities',
  },
}

process.env.NODE_ENV !== 'development' && (ormConfig['ssl'] = {
  rejectUnauthorized: false
})


module.exports = ormConfig