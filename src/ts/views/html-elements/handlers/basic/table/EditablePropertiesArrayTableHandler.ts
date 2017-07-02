import { Property } from "../../../../properties/Property";
import { PropertiesArray } from "../../../../properties/PropertiesArray";
import { Icons } from "../../../Icons";
import { HtmlElementHandler } from "../HtmlElementHandler";
import { ButtonHandler } from "../ButtonHandler";
import { ModalHandler } from "../ModalHandler";
import { PropertyFormHandler } from "../form/PropertyFormHandler";
import { TableRowHandler } from "./TableRowHandler";
import { TableHandler } from "./TableHandler";

interface EditValuesTableOptions {

	propertiesArray: PropertiesArray
	modalHeaderText: string;
	addButtonText: string;

}

export abstract class EditablePropertiesArrayTableHandler extends TableHandler {

	private readonly modalHeaderText: string;
	private readonly addButtonText: string;
	private readonly modalHandler: ModalHandler;

	private propertiesArray: PropertiesArray;

	public constructor(options: EditValuesTableOptions) {
		super();

		this.modalHandler = ModalHandler.getInstance();
		this.propertiesArray = options.propertiesArray;
		this.modalHeaderText = options.modalHeaderText;
		this.addButtonText = options.addButtonText;

		this.fill([]);
	}

	public fill(values: number[]): void {
		this.propertiesArray.update(values);

		this.clearBody();
		for (let i = 0; i < values.length; i++) {
			this
				.addRow(new TableRowHandler()
					.addCell(document.createTextNode(this.propertiesArray.getKey(i)))
					.addCell(document.createTextNode(this.propertiesArray.getValueWithUnits(i)))
					.addCell(this.getEditButton(this.propertiesArray.getProperty(i), i))
					.addCell(this.getDeleteButton(i)));
		}

		this.addRow(new TableRowHandler()
			.addCell(this.getAddButton(), 4));
	}

	public getValues(): number[] {
		return this.propertiesArray.getValues();
	}

	private getAddButton(): HTMLButtonElement {
		let addButton: HTMLButtonElement = new ButtonHandler()
			.setButtonType()
			.addDefaultStyle()
			.addBlockStyle()
			.addClonedNodes(Icons.PLUS)
			.addText(` ${this.addButtonText}`)
			.getHtmlElement();
		addButton.addEventListener("click", (event) => {
			event.preventDefault();
			this.propertiesArray.addProperty();
			this.fill(this.propertiesArray.getValues());
		});

		return addButton;
	}

	private getEditButton(property: Property, index: number): HTMLButtonElement {
		let editButton: HTMLButtonElement = new ButtonHandler()
			.setButtonType()
			.addPrimaryStyle()
			.addBlockStyle()
			.addClonedNodes(Icons.PENCIL)
			.getHtmlElement();

		editButton.addEventListener("click", (event) => {
			event.preventDefault();

			let editValueFormHandler: PropertyFormHandler = new PropertyFormHandler(property);
			editValueFormHandler.getForm().addEventListener("submit", (event) => {
				event.preventDefault();

				let updatedProperty: Property = editValueFormHandler.getProperty();
				this.propertiesArray.updateProperty(updatedProperty, index);
				this.fill(this.propertiesArray.getValues());
				this.modalHandler.hide();
			});

			this.modalHandler.update(this.modalHeaderText, editValueFormHandler.getForm());
			this.modalHandler.show();
		});

		return editButton;
	}

	private getDeleteButton(position: number): HTMLButtonElement {
		let deleteButton: HTMLButtonElement = new ButtonHandler()
			.setButtonType()
			.addWarningStyle()
			.addBlockStyle()
			.addClonedNodes(Icons.TRASH)
			.getHtmlElement();

		deleteButton.addEventListener("click", (event) => {
			event.preventDefault();
			this.propertiesArray.deleteProperty(position);
			this.fill(this.propertiesArray.getValues());
		});

		return deleteButton;
	}

}
