import { InputGroupHandler } from "./InputGroupHandler";
import { Property } from "../../../properties/Property";
import { PropertyInputHandler } from "./PropertyInputHandler";

export class PropertyInputGroupHandler extends InputGroupHandler {

	private readonly propertyInputHandler: PropertyInputHandler;

	public constructor(property: Property) {
		super();

		this.propertyInputHandler = new PropertyInputHandler(property);
		this.embed(this.propertyInputHandler);

		if (property.getValueUnit()) {
			this.addAddonText(property.getValueUnit())
		}
	}

	public setPropertyValue(value: number): void {
		this.propertyInputHandler.setPropertyValue(value);
		this.propertyInputHandler.updateValueFromProperty();
	}

	public updatePropertyValue(): void {
		this.propertyInputHandler.updatePropertyValue();
	}

	public addFormControlStyleToInput(): void {
		this.propertyInputHandler.addFormControlStyle();
	}

}
