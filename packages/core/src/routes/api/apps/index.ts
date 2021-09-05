import type { RequestHandler } from '@sveltejs/kit';
import { handleAuth } from '$lib/modules/serverAuth';
import { q, Fauna } from '$lib/modules/faunaClient';
export const post: RequestHandler = async (Request) => {
	if (!Request.body['Name']) {
		return {
			status: 400
		};
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
				Name: Request.body['Name']
			}
		})
	);
	return {
		status: 200
	};
};
export const get: RequestHandler = async (Request) => {
	const authRes = await handleAuth(Request);
	if (authRes.error) {
		return authRes.error;
	}
	const id = authRes.id;
	return await Fauna.query(q.Match(q.Index('AppsByOwner'), id));
};
