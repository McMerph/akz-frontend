import { HtmlElementHandler } from "./HtmlElementHandler";

export class InputGroupHandler extends HtmlElementHandler<HTMLDivElement, InputGroupHandler> {

	private readonly inputGroup: HTMLDivElement;

	public constructor() {
		let inputGroup = document.createElement("div");
		inputGroup.classList.add("input-group");

		super(inputGroup);
		this.inputGroup = inputGroup;
	}

	public addAddonText(text: string): InputGroupHandler {
		let addonSpan: HTMLSpanElement = document.createElement("span");
		addonSpan.appendChild(document.createTextNode(text));
		addonSpan.classList.add("input-group-addon");
		this.inputGroup.appendChild(addonSpan);
		return this;
	}

	protected getConcreteHandler(): InputGroupHandler {
		return this;
	}

}
