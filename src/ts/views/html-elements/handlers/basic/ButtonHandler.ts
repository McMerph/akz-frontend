import { HtmlElementHandler } from "./HtmlElementHandler";

export class ButtonHandler extends HtmlElementHandler<HTMLButtonElement, ButtonHandler> {

	private readonly button: HTMLButtonElement;

	public constructor() {
		let button: HTMLButtonElement = document.createElement("button");
		button.classList.add("btn");
		super(button);

		this.button = button;
	}

	public setSubmitType(): ButtonHandler {
		this.button.type = "submit";
		return this;
	}

	public setButtonType(): ButtonHandler {
		this.button.type = "button";
		return this;
	}

	public addBlockStyle(): ButtonHandler {
		this.addClasses("btn-block");
		return this;
	}

	public addDefaultStyle(): ButtonHandler {
		this.addClasses("btn-default");
		return this;
	}

	public addWarningStyle(): ButtonHandler {
		this.addClasses("btn-warning");
		return this;
	}

	public addPrimaryStyle(): ButtonHandler {
		this.addClasses("btn-primary");
		return this;
	}

	protected getConcreteHandler(): ButtonHandler {
		return this;
	}

}
