import { PropertiesArray } from "./PropertiesArray";

export class RutEntries extends PropertiesArray {

	private static readonly MM: string = "мм";
	private static readonly PREFIX: string = "Позиция №";
	private static readonly DEFAULT_VALUE: number = 0;

	public constructor() {
		super(RutEntries.MM);
	}

	public generateKey(index: number): string {
		return `${RutEntries.PREFIX}${index + 1}`;
	}

	public getDefaultValue(): number {
		return RutEntries.DEFAULT_VALUE;
	}

}
