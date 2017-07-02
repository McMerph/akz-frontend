import { HtmlElementHandler } from "../HtmlElementHandler";

export class FormHandler extends HtmlElementHandler<HTMLFormElement, FormHandler> {

	private readonly form: HTMLFormElement;

	public constructor() {
		let form = document.createElement("form");

		super(form);
		this.form = form;
	}

	public getForm(): HTMLFormElement {
		return this.form;
	}

	protected getConcreteHandler(): FormHandler {
		return this;
	}

}
