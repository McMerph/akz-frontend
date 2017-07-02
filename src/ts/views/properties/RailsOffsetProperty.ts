import { PropertyOptions } from "./Property";
import { Property } from "./Property";

export class RailsOffsetProperty extends Property {

	private readonly propertWithAbsoluteValue: Property;

	public constructor(options: PropertyOptions) {
		super(options);

		this.propertWithAbsoluteValue = this.clone();
		this.propertWithAbsoluteValue.setAbsoluteValue();
	}

	public getValueWithUnits(): string {
		let formattedValue: string;
		if (this.getValue() > 0) {
			formattedValue = `правый ${this.propertWithAbsoluteValue.getValueWithUnits()}`;
		} else if (this.getValue() < 0) {
			formattedValue = `левый ${this.propertWithAbsoluteValue.getValueWithUnits()}`;
		} else {
			formattedValue = `без забега`;
		}

		return formattedValue;
	}

}