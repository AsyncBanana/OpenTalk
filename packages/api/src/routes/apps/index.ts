import type {RouteHandler} from 'itty-router';
import { handleAuth } from '$modules/serverAuth';
import { q, Fauna } from '$modules/faunaClient';
import { validate } from 'jtd';
import PageSchema from '$schemas/comment';

export const post: RouteHandler<Request> = async (Request) => {
	const body = await Request.json()
	if (validate(PageSchema,body).length>0) {
		return new Response("Invalid body data",{status: 400})
	}
	const authRes = await handleAuth(Request);
	if (authRes.error) {
		return authRes.error;
	}
	const id = authRes.id;
	await Fauna.query(
		q.Create(q.Collection('Apps'), {
			data: {
				Owner: id,
				Name: body['Name']
			}
		})
	);
	return new Response(null,{status: 200})
};
export const get: RouteHandler<Request> = async (Request) => {
	const authRes = await handleAuth(Request);
	if (authRes.error) {
		return new Response("Authentication Error",{status: authRes.error.status})
	}
	const id = authRes.id;
	return new Response(JSON.stringify(await Fauna.query(q.Paginate(q.Match(q.Index('AppsByOwner'), id)))),{status: 200})
};
