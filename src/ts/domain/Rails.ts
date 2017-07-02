export interface RailsOptions {

    rightRailStartOffset: number;
    rightRailEndOffset: number;
    firstSleeperDistanceOnLeft: number;
    firstSleeperDistanceOnRight: number;
    lastSleeperDistanceOnLeft: number;
    lastSleeperDistanceOnRight: number;

}

export class Rails {

    private readonly rightRailStartOffset: number;
    private readonly rightRailEndOffset: number;
    private readonly firstSleeperDistanceOnLeft: number;
    private readonly firstSleeperDistanceOnRight: number;
    private readonly lastSleeperDistanceOnLeft: number;
    private readonly lastSleeperDistanceOnRight: number;

    public constructor(railsOptions: RailsOptions) {
        this.rightRailStartOffset = railsOptions.rightRailStartOffset;
        this.rightRailEndOffset = railsOptions.rightRailEndOffset;
        this.firstSleeperDistanceOnLeft = railsOptions.firstSleeperDistanceOnLeft;
        this.firstSleeperDistanceOnRight = railsOptions.firstSleeperDistanceOnRight;
        this.lastSleeperDistanceOnLeft = railsOptions.lastSleeperDistanceOnLeft;
        this.lastSleeperDistanceOnRight = railsOptions.lastSleeperDistanceOnRight;
    }

    public getRightRailStartOffset(): number {
        return this.rightRailStartOffset;
    }

    public getRightRailEndOffset(): number {
        return this.rightRailEndOffset;
    }

    public getFirstSleeperDistanceOnLeft(): number {
        return this.firstSleeperDistanceOnLeft;
    }

    public getFirstSleeperDistanceOnRight(): number {
        return this.firstSleeperDistanceOnRight;
    }

    public getLastSleeperDistanceOnLeft(): number {
        return this.lastSleeperDistanceOnLeft;
    }

    public getLastSleeperDistanceOnRight(): number {
        return this.lastSleeperDistanceOnRight;
    }

    public toString(): string {
        return `Rails{rightRailStartOffset = ${this.rightRailStartOffset}, rightRailEndOffset = ${this.rightRailEndOffset}, firstSleeperDistanceOnLeft = ${this.firstSleeperDistanceOnLeft}, firstSleeperDistanceOnRight = ${this.firstSleeperDistanceOnRight}, lastSleeperDistanceOnLeft = ${this.lastSleeperDistanceOnLeft}, lastSleeperDistanceOnRight = ${this.lastSleeperDistanceOnRight}}`;
    }

}