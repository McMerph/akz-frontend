import { HtmlElementHandler } from "../HtmlElementHandler";

export class FormGroupHandler extends HtmlElementHandler<HTMLDivElement, FormGroupHandler> {

	private readonly formGroup: HTMLDivElement;

	public constructor() {
		let formGroup = document.createElement("div");
		formGroup.classList.add("form-group");

		super(formGroup);
		this.formGroup = formGroup;
	}

	public addLabel(text: string): FormGroupHandler {
		let label: HTMLLabelElement = document.createElement("label");
		label.appendChild(document.createTextNode(text));
		this.formGroup.appendChild(label);
		return this;
	}

	protected getConcreteHandler(): FormGroupHandler {
		return this;
	}

}
