import { Router as RouterClass } from 'itty-router'
import { get as apps_get, post as apps_post } from './routes/apps/index'
import {
  get as comments_page_get,
  post as comments_page_post,
} from './routes/comments/[page]'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/*import { Client as ClientConstructor, query as q } from 'faunadb'
import { jwtVerify } from 'jose-browser-runtime/jwt/verify'
import { createRemoteJWKSet } from 'jose-browser-runtime/jwks/remote'*/

const router = RouterClass({
  base: '/',
})
router.get('api/apps', apps_get)
router.post('api/apps', apps_post)
router.get('api/comments/:page', comments_page_get)
router.post('api/comments/:page', comments_page_post)
router.all('*', () => new Response('Not Found.', { status: 404 }))

// attach the router "handle" to the event handler
addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})
