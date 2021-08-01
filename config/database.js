module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '192.168.1.111'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', '3dbyte'),
        username: env('DATABASE_USERNAME', 'kurt'),
        password: env('DATABASE_PASSWORD', '376522030'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
