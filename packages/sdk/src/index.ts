import axios from "axios";
interface Options {
	appId: string;
	pageId: string;
	pageUrl: string;
	apiHost: string;
}
interface Comment {
	Author: string;
	Time: Date;
	Replied?: string;
	Text: string;
}
/**
 * The official client for the OpenTalk commenting API
 */
export default class OpenTalkClient {
	constructor(Options: Options) {
		this.appId = Options.appId;
		this.pageId = Options.pageId;
		this.pageUrl = Options.pageUrl;
		this.apiHost = Options.apiHost || "https://opentalk.dev/api";
	}
	/**
	 * Get a list of all page comments based on class config
	 */
	async getPageComments() {
		const res = await axios.get(`${this.apiHost}/comments/${this.pageUrl}`, {
			params: {
				appId: this.appId,
			},
		});
		return res.data.map((item: Comment) => {
			item.Time = new Date(item.Time);
			return item;
		});
	}
	async submitComment(author: string, text: string, replied: string) {
		const res = await axios.post(
			`${this.apiHost}/comments/${this.pageUrl}`,
			{
				Author: author,
				Text: text,
				Replied: replied,
			},
			{
				params: {
					appId: this.appId,
				},
			}
		);
	}
	appId: string;
	pageId: string;
	pageUrl: string;
	apiHost: string;
}
