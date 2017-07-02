import { ConsistentChecker } from "./ConsistentChecker";
import { RestApiEntity } from "../rest-api/RestApiEntity";
import { JointedTrackPartCompactRepresentation } from "./JointedTrackPartCompactRepresentation";
import { JointedTrackPartCompactRepresentationOptions } from "./JointedTrackPartCompactRepresentation";

export interface SearchResponseOptions {

    count: number;
    jointedTrackPartCompactRepresentations: JointedTrackPartCompactRepresentationOptions[];

}

export class SearchResponse implements RestApiEntity {

    private readonly count: number;
    private readonly jointedTrackPartCompactRepresentations: JointedTrackPartCompactRepresentation[];

    public constructor(options: SearchResponseOptions) {
        this.count = options.count;
        if (options.jointedTrackPartCompactRepresentations && Array.isArray(options.jointedTrackPartCompactRepresentations)) {
            this.jointedTrackPartCompactRepresentations = options.jointedTrackPartCompactRepresentations.
                map(representation => new JointedTrackPartCompactRepresentation(representation));
        }
    }

    // RestApiEntity
    public isConsistent(): boolean {
        return ConsistentChecker.check(this) &&
            this.jointedTrackPartCompactRepresentations.every(
                representation => ConsistentChecker.check(representation)
            );
    }

    public getCount(): number {
        return this.count;
    }

    public getJointedTrackPartCompactRepresentations(): JointedTrackPartCompactRepresentation[] {
        return this.jointedTrackPartCompactRepresentations;
    }

}