export const config = {
  db: {
    mongo: {
      host: 'localhost',
      port: '27017',
      dbName: 'iron'
    }
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  allowIP: [
    'http://localhost:8080'
  ]
}