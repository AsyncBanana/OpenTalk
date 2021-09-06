import { jwtVerify } from 'jose-browser-runtime/jwt/verify'
import { createRemoteJWKSet } from 'jose-browser-runtime/jwks/remote'

const valueOverrides = {
  mode: undefined,
  credentials: undefined,
  referrerPolicy: undefined,
  signal: undefined,
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply: (target, thisArg, argumentsList) => {
    if (argumentsList[1]) {
      for (const override in valueOverrides) {
        if (argumentsList[1][override]) {
          argumentsList[1][override] = valueOverrides[override]
        }
      }
    }
    return Reflect.apply(target, thisArg, argumentsList)
  },
})

interface authResult {
  error?: { status: number }
  id?: string
}
const JWKS = createRemoteJWKSet(
  new URL(`https://${AUTH0_DOMAIN}/.well-known/jwks.json`),
)
export async function handleAuth(request: Request): Promise<authResult> {
  const auth = request.headers
    .get('authorization')
    ?.split(' ')
    .pop()
  if (!auth) {
    return { error: { status: 401 } }
  }
  const userId = await getUserId(auth)
  if (!userId) {
    return { error: new Response('No userId', { status: 401 }) }
  }
  return { id: userId }
}
export async function getUserId(jwt: string): Promise<string> {
  const res = await jwtVerify(jwt, JWKS, {
    algorithms: ['RS256'],
    audience: `${DOMAIN}/api`,
  })
  return res.payload.sub
}
