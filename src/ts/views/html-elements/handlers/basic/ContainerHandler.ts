import { HtmlElementHandler } from "./HtmlElementHandler";

export class ContainerHandler extends HtmlElementHandler<HTMLDivElement, ContainerHandler> {

	private readonly div: HTMLDivElement;

	public constructor() {
		let div = document.createElement("div");
		div.classList.add("container");

		super(div);
		this.div = div;
	}

	protected getConcreteHandler(): ContainerHandler {
		return this;
	}

}
