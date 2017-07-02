import { HtmlElementHandler } from "./HtmlElementHandler";

export class AnchorHandler extends HtmlElementHandler<HTMLAnchorElement, AnchorHandler> {

	private readonly anchor: HTMLAnchorElement;

	public constructor(href: string) {
		let anchor: HTMLAnchorElement = document.createElement("a");
		anchor.href = href;

		super(anchor);
		this.anchor = anchor;
	}

	// Open in new tab or window
	public setBlankTarget(): AnchorHandler {
		this.anchor.target = "_blank";
		return this;
	}

	public addDefaultButtonStyle(): AnchorHandler {
		this.addClasses("btn", "btn-default");
		return this;
	}

	protected getConcreteHandler(): AnchorHandler {
		return this;
	}

}
