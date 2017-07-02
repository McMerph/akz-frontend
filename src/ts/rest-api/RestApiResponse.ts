import { RestApiEntity } from "./RestApiEntity";
import { RestApiResponseEvent } from "./RestApiResponseEvent";

interface RestApiResponseOptions {

    event: RestApiResponseEvent;
    entity: RestApiEntity;

}

export class RestApiResponse {

    private event: RestApiResponseEvent;
    private entity: RestApiEntity;

    public constructor(options: RestApiResponseOptions) {
        this.event = options.event;
        this.entity = options.entity;
    }

    public log(): void {
        console.log(`There was an event from REST API: ${RestApiResponseEvent[this.event]}`);
        console.log(this.entity);
    }

    public getEvent(): RestApiResponseEvent {
        return this.event;
    }

    public getEntity(): RestApiEntity {
        return this.entity;
    }

}
