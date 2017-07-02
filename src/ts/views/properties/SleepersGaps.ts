import { PropertiesArray } from "./PropertiesArray";

export class SleepersGaps extends PropertiesArray {

	private static readonly MM: string = "мм";
	private static readonly PREFIX: string = "Между шпалами";
	private static readonly MIDDLE: string = "и";
	private static readonly DEFAULT_VALUE: number = 0;

	public constructor() {
		super(SleepersGaps.MM);
	}

	public generateKey(index: number): string {
		return `${SleepersGaps.PREFIX} ${index + 1} ${SleepersGaps.MIDDLE} ${index + 2}`;
	}

	public getDefaultValue(): number {
		return SleepersGaps.DEFAULT_VALUE;
	}

}
