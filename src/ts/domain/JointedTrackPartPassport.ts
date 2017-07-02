import { ConsistentChecker } from "./ConsistentChecker";
import { RestApiEntity } from "../rest-api/RestApiEntity";
import { JointedTrackPart } from "./JointedTrackPart";
import { JointedTrackPartOptions } from "./JointedTrackPart";

export interface JointedTrackPartPassportOptions {

    jointedTrackPart: JointedTrackPartOptions;
    //TODO Rename to validResistance?
    validResistance: boolean;

}

export class JointedTrackPartPassport implements RestApiEntity {

    private readonly jointedTrackPart: JointedTrackPart;
    private readonly validResistance: boolean;

    public constructor(options: JointedTrackPartPassportOptions) {
        if (options.jointedTrackPart) {
            this.jointedTrackPart = new JointedTrackPart(options.jointedTrackPart);
        }
        this.validResistance = options.validResistance;
    }

    // RestApiEntity
    public isConsistent(): boolean {
        return ConsistentChecker.check(this) &&
            ConsistentChecker.check(this.jointedTrackPart);
    }

    public isValidResistance(): boolean {
        return this.validResistance;
    }

    public getRut(): number[] {
        return this.jointedTrackPart.getRut();
    }

    public getSleepersGaps(): number[] {
        return this.jointedTrackPart.getSleepersGaps();
    }

    public getJointedTrackPart(): JointedTrackPart {
        return this.jointedTrackPart;
    }

    public toString(): string {
        return `JointedTrackPartPassport{jointedTrackPart = ${this.jointedTrackPart}, valid = ${this.validResistance}}`;
    }

}