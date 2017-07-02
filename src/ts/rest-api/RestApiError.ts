import { RestApiErrorEvent } from "./RestApiErrorEvent";

interface RestApiErrorOptions {

    event: RestApiErrorEvent;
    request: XMLHttpRequest;

}

export class RestApiError {

    private event: RestApiErrorEvent;
    private request: XMLHttpRequest;

    public constructor(options: RestApiErrorOptions) {
        this.event = options.event;
        this.request = options.request;
    }

    public toString(): string {
        return `${RestApiErrorEvent[this.event]}. Status: "${this.request.status}", Status text: "${this.request.statusText}, Response text: "${this.request.responseText}`;
    }

    public log(): void {
        console.warn(this.request);
    }

    public getEvent(): RestApiErrorEvent {
        return this.event;
    }

    public getRequest(): XMLHttpRequest {
        return this.request;
    }

}
