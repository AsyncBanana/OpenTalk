import s from "axios";
export default class p {
	constructor(t) {
		(this.appId = t.appId),
			(this.pageId = t.pageId),
			(this.pageUrl = t.pageUrl),
			(this.apiHost = t.apiHost || "https://opentalk.dev/api");
	}
	async getPageComments() {
		return (
			await s.get(`${this.apiHost}/comments/${this.pageUrl}`, {
				params: { appId: this.appId },
			})
		).data.map((a) => ((a.Time = new Date(a.Time)), a));
	}
	async submitComment(t, a, e) {
		const r = await s.post(
			`${this.apiHost}/comments/${this.pageUrl}`,
			{ Author: t, Text: a, Replied: e },
			{ params: { appId: this.appId } }
		);
	}
	appId;
	pageId;
	pageUrl;
	apiHost;
}
//# sourceMappingURL=index.js.map
