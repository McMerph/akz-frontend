export interface PropertyOptions {

	key: string;
	value?: number;
	valueUnit?: string;
	valid?: boolean;

}

export class Property {

	protected static readonly DELIMITER: number = 1000;
	protected static readonly FRACTION_DIGITS: number = 3;

	protected key: string;
	protected value: number;
	protected valueUnit: string;
	protected valid: boolean;

	public constructor(options: PropertyOptions) {
		this.key = options.key;
		this.value = options.value;
		this.valueUnit = options.valueUnit;
		this.valid = options.valid;
	}

	public updateValue(valueInUnits: string): void {
		let value: number = this.getValueUnit()
			? parseFloat(valueInUnits) * Property.DELIMITER
			: parseFloat(valueInUnits);
		this.value = parseFloat(value.toFixed(Property.FRACTION_DIGITS));
	}

	public getStep(): number {
		return parseFloat((1 / Property.DELIMITER).toFixed(Property.FRACTION_DIGITS));
	}

	public getValueInLocalizedUnits(): string {
		return this.getValueUnit()
			? (this.value / Property.DELIMITER).toLocaleString(
				window.navigator.language,
				{
					minimumFractionDigits: Property.FRACTION_DIGITS,
					maximumFractionDigits: Property.FRACTION_DIGITS
				})
			: this.value.toString();
	}

	public getValueInUnits(): string {
		return this.getValueUnit()
			? (this.value / Property.DELIMITER).toFixed(Property.FRACTION_DIGITS)
			: this.value.toString();
	}

	public getValueWithUnits(): string {
		return this.getValueUnit()
			? `${this.getValueInLocalizedUnits()} ${this.valueUnit}`
			: this.value.toString();
	}

	public setAbsoluteValue(): void {
		this.value = Math.abs(this.value);
	}

	public clone(): Property {
		return new Property({
			key: this.key,
			value: this.value,
			valueUnit: this.valueUnit,
			valid: this.valid
		});
	}

	public getKey(): string {
		return this.key;
	}

	public getValue(): number {
		return this.value;
	}

	public setValue(value: number): void {
		this.value = value;
	}

	public getValueUnit(): string {
		return this.valueUnit;
	}

	public isValid(): boolean {
		return this.valid;
	}

}
