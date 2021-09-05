declare module "index" {
    interface Options {
        appId: string;
        pageId: string;
        pageUrl: string;
        apiHost: string;
    }
    /**
     * The official client for the OpenTalk commenting API
     */
    export default class OpenTalkClient {
        constructor(Options: Options);
        /**
         * Get a list of all page comments based on class config
         */
        getPageComments(): Promise<any>;
        submitComment(author: string, text: string, replied: string): Promise<void>;
        appId: string;
        pageId: string;
        pageUrl: string;
        apiHost: string;
    }
}
