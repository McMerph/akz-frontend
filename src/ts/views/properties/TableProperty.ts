import { Property } from "./Property";

export class TableProperty {

	private readonly property: Property;
	private readonly colSpan: number;

	public constructor(property: Property, colSpan?: number) {
		this.property = property;

		if (!colSpan) {
			this.colSpan = 1;
		} else {
			this.colSpan = colSpan;
		}
	}

	public getValueWithUnits(): string {
		return this.property.getValueWithUnits();
	}

	public getKey(): string {
		return this.property.getKey();
	}

	public isValid(): boolean {
		return this.property.isValid();
	}

	public getColSpan(): number {
		return this.colSpan;
	}

}
