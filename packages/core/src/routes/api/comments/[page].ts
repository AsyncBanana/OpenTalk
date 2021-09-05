import type { RequestHandler } from '@sveltejs/kit';
import { q, Fauna } from '$lib/modules/faunaClient';
import { validate } from 'jtd';
import CommentSchema from '$lib/schemas/comment';

export const get: RequestHandler = async (Request) => {
	if (!Request.query.get('appId')) {
		return {
			status: 400
		};
	}
	try {
		const res: { data: [[string, string | null, { value: string }, string]] } = await Fauna.query(
			q.Paginate(
				q.Match(
					q.Index('CommentsByPage'),
					Request.params.page,
					q.Ref(q.Collection('Apps'), Request.query.get('appId'))
				),
				{ size: 5 }
			)
		);
		return {
			body: res.data.map((res) => {
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
		};
	} catch (err) {
		console.error(err);
	}
};
export const post: RequestHandler = async (Request) => {
	if (typeof Request.body === 'object' && Request.query.get('appId')) {
		const validationRes = validate(CommentSchema, Request.body);
		if (validationRes.length === 0) {
			try {
				const res: Record<string, unknown> | string = await Fauna.query(
					q.If(
						q.Exists(q.Ref(q.Collection('Apps'), Request.query.get('appId'))),
						q.Create(q.Collection('Comments'), {
							data: {
								...Request.body,
								Page: Request.params.page,
								Time: q.Now(),
								AppId: q.Ref(q.Collection('Apps'), Request.query.get('appId'))
							}
						}),
						'Invalid AppId'
					)
				);
				if (res === 'Invalid AppId') {
					return {
						status: 400
					};
				}
				return {
					status: 200
				};
			} catch (err) {
				console.error(err);
				return {
					status: 500
				};
			}
		}
	}
	return {
		status: 400
	};
};
