import { HtmlElementHandler } from "./HtmlElementHandler";

export class LiHandler extends HtmlElementHandler<HTMLLIElement, LiHandler> {

	private readonly li: HTMLLIElement;

	public constructor() {
		let li = document.createElement("li");

		super(li);
		this.li = li;
	}

	public disable(): LiHandler {
		this.li.classList.add("disabled");
		return this;
	}

	public enable(): LiHandler {
		this.li.classList.remove("disabled");
		return this;
	}

	protected getConcreteHandler(): LiHandler {
		return this;
	}

}
