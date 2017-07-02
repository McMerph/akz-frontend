import { HtmlElementHandler } from "../HtmlElementHandler";

export class PanelsGroupHandler extends HtmlElementHandler<HTMLDivElement, PanelsGroupHandler> {

	private readonly div: HTMLDivElement;

	public constructor(id: string) {
		let div = document.createElement("div");
		div.classList.add("panel-group");
		div.id = id;

		super(div);
		this.div = div;
	}

	protected getConcreteHandler(): PanelsGroupHandler {
		return this;
	}

}
