export interface ResistanceMeasurementOptions {

    temperature: number;
    humidity: number;
    resistance: number;

}

export class ResistanceMeasurement {

    private readonly temperature: number;
    private readonly humidity: number;
    private readonly resistance: number;

    public constructor(resistanceMeasurementOptions: ResistanceMeasurementOptions) {
        this.temperature = resistanceMeasurementOptions.temperature;
        this.humidity = resistanceMeasurementOptions.humidity;
        this.resistance = resistanceMeasurementOptions.resistance;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public getHumidity(): number {
        return this.humidity;
    }

    public getResistance(): number {
        return this.resistance;
    }

    public toString(): string {
        return `ResistanceMeasurement{temperature = ${this.temperature}, humidity = ${this.humidity}, resistance = ${this.resistance}}`;
    }

}