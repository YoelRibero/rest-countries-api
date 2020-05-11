export class API {
    constructor(url) {
        this.url = url;
    }

    async getData () {
        const data = await fetch(this.url);
        const results = await data.json();
        return results;
    }
}