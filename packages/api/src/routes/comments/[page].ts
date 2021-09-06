import type {RouteHandler} from 'itty-router';
import { q, Fauna } from '$modules/faunaClient';
import { validate } from 'jtd';
import CommentSchema from '$schemas/comment';

export const get: RouteHandler<Request> = async (Request) => {
	if (!Request.query['appId']) {
		return new Response("No appId provided",{status: 400})
	}
	try {
		const res: { data: [[string, string | null, { value: string }, string]] } = await Fauna.query(
			q.Paginate(
				q.Match(
					q.Index('CommentsByPage'),
					Request.params.page,
					q.Ref(q.Collection('Apps'), Request.query['appId'])
				),
				{ size: 5 }
			)
		);
		return new Response(JSON.stringify(res.data.map((res) => {
				if (res[1]) {
					return {
						Author: res[0],
						Replied: res[1],
						Text: res[3],
						Time: res[2].value
					};
				} else {
					return {
						Author: res[0],
						Text: res[3],
						Time: res[2].value
					};
				}
			})
		),{status: 200})
	} catch (err) {
		console.error(err);
	}
};
export const post: RouteHandler<Request> = async (Request) => {
	const body = Request.json()
	if (typeof body === 'object' && Request.query['appId']) {
		const validationRes = validate(CommentSchema, body);
		if (validationRes.length === 0) {
			try {
				const res: Record<string, unknown> | string = await Fauna.query(
					q.If(
						q.Exists(q.Ref(q.Collection('Apps'), Request.query['appId'])),
						q.Create(q.Collection('Comments'), {
							data: {
								...body,
								Page: Request.params.page,
								Time: q.Now(),
								AppId: q.Ref(q.Collection('Apps'), Request.query['appId'])
							}
						}),
						'Invalid AppId'
					)
				);
				if (res === 'Invalid AppId') {
					return new Response("Invalid appId",{status: 400})
				}
				return new Response(null,{status: 200})
			} catch (err) {
				console.error(err);
				return new Response("Unknown server error",{status: 500})
			}
		}
	}
	return new Response("Invalid request",{status: 400})
};
