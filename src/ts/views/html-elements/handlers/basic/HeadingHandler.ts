import { HtmlElementHandler } from "./HtmlElementHandler";

export enum HeadingType {

	h1,
	h2,
	h3,
	h4,
	h5,
	h6

}

export class HeadingHandler extends HtmlElementHandler<HTMLHeadingElement, HeadingHandler> {

	private readonly heading: HTMLHeadingElement;

	public constructor(headingType: HeadingType) {
		let heading: HTMLHeadingElement = (document.createElement(HeadingType[headingType]) as HTMLHeadingElement);

		super(heading);
		this.heading = heading;
	}

	public setText(text: string): HeadingHandler {
		this.removeChilds();
		this.heading.appendChild(document.createTextNode(text));
		return this;
	}

	public setTextCenter(): HeadingHandler {
		this.heading.classList.add("text-center");
		return this;
	}

	public setInfoStyle(): HeadingHandler {
		this.heading.classList.add("text-info");
		return this;
	}

	public setWarningStyle(): HeadingHandler {
		this.heading.classList.add("text-warning");
		return this;
	}

	protected getConcreteHandler(): HeadingHandler {
		return this;
	}

}
