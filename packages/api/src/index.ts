import { Router as RouterClass } from 'itty-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/*import { Client as ClientConstructor, query as q } from 'faunadb'
import { jwtVerify } from 'jose-browser-runtime/jwt/verify'
import { createRemoteJWKSet } from 'jose-browser-runtime/jwks/remote'*/

const router = RouterClass({
  base: '/',
})

router.all('*', () => new Response('Not Found.', { status: 404 }))

// attach the router "handle" to the event handler
addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})
