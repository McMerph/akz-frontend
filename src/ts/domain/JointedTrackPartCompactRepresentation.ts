export interface JointedTrackPartCompactRepresentationOptions {

    id: number;
    definition: string;
    creationDate: string;
    valid: boolean;

}

export class JointedTrackPartCompactRepresentation {

    private readonly id: number;
    private readonly definition: string;
    private readonly creationDate: string;
    private readonly valid: boolean;

    public constructor(jointedTrackPartCompactRepresentation: JointedTrackPartCompactRepresentationOptions) {
        this.id = jointedTrackPartCompactRepresentation.id;
        this.definition = jointedTrackPartCompactRepresentation.definition;
        this.creationDate = jointedTrackPartCompactRepresentation.creationDate;
        this.valid = jointedTrackPartCompactRepresentation.valid;
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

    public isValid(): boolean {
        return this.valid;
    }

    public toString(): string {
        return `JointedTrackPartCompactRepresentation{id = ${this.id}, definition = ${this.definition}, creationDate = ${this.creationDate}, valid = ${this.valid}}`;
    }

}