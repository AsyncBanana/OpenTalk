import type { RequestHandler } from '@sveltejs/kit';
import { Client, query as q } from 'faunadb';
import { validate } from 'jtd';
import CommentSchema from '$lib/schemas/comment';
const Fauna = new Client({
	secret: import.meta.env.VITE_FAUNA_KEY,
	domain: 'db.eu.fauna.com'
});
export const get: RequestHandler = async (Request) => {
	try {
		const res: { data: [[string, string, string | null, { value: string }]] } = await Fauna.query(
			q.Paginate(q.Match(q.Index('CommentsByPage'), Request.params.page), { size: 5 })
		);
		return {
			body: res.data.map((res) => {
				if (res[1]) {
					return {
						Author: res[0],
						Replied: res[1],
						Text: res[2],
						Time: res[3].value
					};
				} else {
					return {
						Author: res[0],
						Text: res[2],
						Time: res[3].value
					};
				}
			})
		};
	} catch (err) {
		console.error(err);
	}
};
export const post: RequestHandler = async (Request) => {
	if (typeof Request.body === 'object') {
		const validationRes = validate(CommentSchema, Request.body);
		if (validationRes.length === 0) {
			try {
				await Fauna.query(
					q.Create(q.Collection('Comments'), {
						data: {
							...Request.body,
							Page: Request.params.page,
							Time: q.Now()
						}
					})
				);
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
