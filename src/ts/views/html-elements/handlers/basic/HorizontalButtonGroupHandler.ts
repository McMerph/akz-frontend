import { HtmlElementHandler } from "./HtmlElementHandler";
import { ButtonHandler } from "./ButtonHandler";

export class HorizontalButtonGroupHandler extends HtmlElementHandler<HTMLDivElement, HorizontalButtonGroupHandler> {

	private readonly div: HTMLDivElement;

	public constructor() {
		let div = document.createElement("div");
		div.classList.add("btn-group", "btn-group-justified");

		super(div);
		this.div = div;
	}

	public embedButton(buttonHandler: ButtonHandler): HorizontalButtonGroupHandler {
		let buttonWrapper = document.createElement("div");
		buttonWrapper.classList.add("btn-group");
		buttonWrapper.appendChild(buttonHandler.getHtmlElement());
		this.div.appendChild(buttonWrapper);

		return this;
	}

	protected getConcreteHandler(): HorizontalButtonGroupHandler {
		return this;
	}

}
