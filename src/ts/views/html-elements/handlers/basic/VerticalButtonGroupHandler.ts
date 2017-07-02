import { HtmlElementHandler } from "./HtmlElementHandler";

export class VerticalButtonGroupHandler extends HtmlElementHandler<HTMLDivElement, VerticalButtonGroupHandler> {

	private readonly div: HTMLDivElement;

	public constructor() {
		let div = document.createElement("div");
		div.classList.add("btn-group-vertical", "btn-block");

		super(div);
		this.div = div;
	}

	protected getConcreteHandler(): VerticalButtonGroupHandler {
		return this;
	}

}
