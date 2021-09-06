import { Client } from 'faunadb'
export const Fauna = new Client({
  secret: FAUNA_KEY,
  domain: 'db.eu.fauna.com',
})
export { query as q } from 'faunadb'
