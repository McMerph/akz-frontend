import { ConsistentChecker } from "./ConsistentChecker";
import { RestApiEntity } from "../rest-api/RestApiEntity";
import { Rails } from "./Rails";
import { RailsOptions } from "./Rails";
import { ResistanceMeasurement } from "./ResistanceMeasurement";
import { ResistanceMeasurementOptions } from "./ResistanceMeasurement";

export interface JointedTrackPartOptions {

    id: number;
    definition: string;
    creationDate: string;
    rut: number[];
    sleepersGaps: number[];
    rails: RailsOptions;
    resistanceMeasurement: ResistanceMeasurementOptions;

}

export class JointedTrackPart implements RestApiEntity {

    private readonly id: number;
    private readonly definition: string;
    private readonly creationDate: string;
    private readonly rut: number[];
    private readonly sleepersGaps: number[];
    private readonly rails: Rails;
    private readonly resistanceMeasurement: ResistanceMeasurement;

    public constructor(options: JointedTrackPartOptions) {
        this.id = options.id;
        this.definition = options.definition;
        this.creationDate = options.creationDate;
        this.rut = options.rut;
        this.sleepersGaps = options.sleepersGaps;
        if (options.rails) {
            this.rails = new Rails(options.rails);
        }
        if (options.resistanceMeasurement) {
            this.resistanceMeasurement = new ResistanceMeasurement(options.resistanceMeasurement);
        }
    }

    // RestApiEntity
    public isConsistent(): boolean {
        return ConsistentChecker.check(this) &&
            ConsistentChecker.check(this.rails) &&
            ConsistentChecker.check(this.resistanceMeasurement);
    }

    public getJointedTrackPartWithoutId(): any {
        let jointedTrackPartWithoutId = {
            definition: this.definition,
            creationDate: this.creationDate,
            rut: this.rut,
            sleepersGaps: this.sleepersGaps,
            rails: {
                rightRailStartOffset: this.rails.getRightRailStartOffset(),
                rightRailEndOffset: this.rails.getRightRailEndOffset(),
                firstSleeperDistanceOnLeft: this.rails.getFirstSleeperDistanceOnLeft(),
                firstSleeperDistanceOnRight: this.rails.getFirstSleeperDistanceOnRight(),
                lastSleeperDistanceOnLeft: this.rails.getLastSleeperDistanceOnLeft(),
                lastSleeperDistanceOnRight: this.rails.getLastSleeperDistanceOnRight()
            },
            resistanceMeasurement: {
                temperature: this.resistanceMeasurement.getTemperature(),
                humidity: this.resistanceMeasurement.getHumidity(),
                resistance: this.resistanceMeasurement.getResistance()
            }
        };

        return jointedTrackPartWithoutId;
    }

    public getId(): number {
        return this.id;
    }

    public getDefinition(): string {
        return this.definition;
    }

    public getCreationDate(): string {
        return this.creationDate;
    }

    public getRut(): number[] {
        return this.rut;
    }

    public getSleepersGaps(): number[] {
        return this.sleepersGaps;
    }

    public getRails(): Rails {
        return this.rails;
    }

    public getResistanceMeasurement(): ResistanceMeasurement {
        return this.resistanceMeasurement;
    }

    public toString(): string {
        return `JointedTrackPart{id = ${this.id}, definition = ${this.definition}, creationDate = ${this.creationDate}, rut = ${this.rut}, sleepersGaps = ${this.sleepersGaps}, rails = ${this.rails}, resistanceMeasurement = ${this.resistanceMeasurement}}`;
    }

}
