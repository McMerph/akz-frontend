import { Property } from "../../../../properties/Property";
import { Icons } from "../../../Icons";
import { ButtonHandler } from "../ButtonHandler";
import { InputGroupHandler } from "../InputGroupHandler";
import { InputType } from "../InputHandler";
import { InputHandler } from "../InputHandler";
import { FormGroupHandler } from "./FormGroupHandler";
import { FormHandler } from "./FormHandler";

export class PropertyFormHandler extends FormHandler {

	private static readonly UPDATE_TEXT: string = "Записать";
	private static readonly PLACEHOLDER: string = "Введите значение...";

	private property: Property;
	private valueInputHandler: InputHandler;

	public constructor(property: Property) {
		super();
		this.property = property;

		this.valueInputHandler = new InputHandler(InputType.number)
			.addFormControlStyle()
			.setPlaceholder(PropertyFormHandler.PLACEHOLDER)
			.setStep(property.getStep())
			.setValue(property.getValueInUnits());

		this
			.embed(new FormGroupHandler()
				.addLabel(property.getKey())
				.embed(new InputGroupHandler()
					.embed(this.valueInputHandler)
					.addAddonText(property.getValueUnit())
				))
			.embed(new FormGroupHandler()
				.embed(new ButtonHandler()
					.setSubmitType()
					.addPrimaryStyle()
					.addBlockStyle()
					.addClonedNodes(Icons.PENCIL)
					.addText(` ${PropertyFormHandler.UPDATE_TEXT}`)
				));
	}

	public getProperty(): Property {
		this.property.updateValue(this.valueInputHandler.getValue());
		return this.property;
	}

	protected getConcreteHandler(): PropertyFormHandler {
		return this;
	}

}
