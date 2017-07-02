import { HtmlElementHandler } from "./HtmlElementHandler";

export class PaginationHandler extends HtmlElementHandler<HTMLUListElement, PaginationHandler> {

	private readonly ul: HTMLUListElement;

	public constructor() {
		let ul = document.createElement("ul");
		ul.classList.add("pagination");

		super(ul);
		this.ul = ul;
	}

	protected getConcreteHandler(): PaginationHandler {
		return this;
	}

}
