import { Property } from "./Property";

export abstract class PropertiesArray {

	protected readonly valueUnit: string;
	protected readonly valid: boolean;

	private properties: Property[];

	public constructor(valueUnit?: string, valid?: boolean) {
		this.properties = [];
		this.valueUnit = valueUnit;
		this.valid = valid;
	}

	public abstract generateKey(index: number): string;

	public abstract getDefaultValue(): number;

	public update(values: number[]): void {
		this.properties = [];

		for (let i = 0; i < values.length; i++) {
			this.properties.push(new Property({
				key: this.generateKey(i),
				value: values[i],
				valueUnit: this.valueUnit,
				valid: this.valid
			}));
		}
	}

	public updateProperty(updatedProperty: Property, index: number): void {
		this.properties[index] = updatedProperty;
	}

	public addProperty(): void {
		this.properties.push(new Property({
			key: this.generateKey(this.properties.length),
			value: this.getDefaultValue(),
			valueUnit: this.valueUnit
		}));
	}

	public deleteProperty(index: number): void {
		this.properties.splice(index, 1);
	}

	public getProperty(index: number): Property {
		return this.properties[index];
	}

	public getValues(): number[] {
		return this.properties.map((property) => property.getValue());
	}

	public getKey(index: number): string {
		return this.properties[index].getKey();
	}

	public getValueWithUnits(index: number): string {
		return this.properties[index].getValueWithUnits();
	}

	public getProperties(): Property[] {
		return this.properties;
	}

}
