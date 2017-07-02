import { InputType } from "./InputHandler";
import { InputHandler } from "./InputHandler";
import { Property } from "../../../properties/Property";

export class PropertyInputHandler extends InputHandler {

	private readonly property: Property;

	public constructor(property: Property) {
		super(InputType.number);
		this.property = property;

		this.setPlaceholder(property.getKey());
		this.setStep(property.getStep());
		this.updateValueFromProperty();
	}

	public updateValueFromProperty(): PropertyInputHandler {
		this.setValue(this.property.getValueInUnits());
		return this;
	}

	public updatePropertyValue(): void {
		this.property.updateValue(this.getValue());
	}

	public setPropertyValue(value: number): void {
		this.property.setValue(value);
	}

}