export class StoreUserTestRailDataRequest {
    readonly url;
    readonly apiKey;

    constructor(url: string, apiKey: string) {
        this.url = url;
        this.apiKey = apiKey;
    }
}