import { HtmlElementHandler } from "./HtmlElementHandler";

//TODO [Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive. - onClick handler - verbose violation on Chrome browser
export class SelectHandler extends HtmlElementHandler<HTMLSelectElement, SelectHandler> {

	private static readonly SIZE: number = 1;

	private readonly select: HTMLSelectElement;
	private values: string[];

	public constructor() {
		let select: HTMLSelectElement = document.createElement("select");
		select.size = SelectHandler.SIZE;

		super(select);
		this.select = select;
		this.values = [];
	}

	public update(values: string[]): SelectHandler {
		this.removeChilds();

		for (let value of values) {
			this.select.appendChild(this.generateOption(value));
		}
		if (values.length >= 0) {
			this.select.value = values[0];
		}
		this.values = values;
		return this;
	}

	public setValue(value: string): SelectHandler {
		if (this.values.indexOf(value) !== -1) {
			this.select.value = value;
		}
		return this;
	}

	public getValue(): string {
		return this.select.value;
	}

	private generateOption(value: string): HTMLOptionElement {
		let option: HTMLOptionElement = document.createElement("option");
		option.value = value;
		option.appendChild(document.createTextNode(value));

		return option;
	}

	protected getConcreteHandler(): SelectHandler {
		return this;
	}

}
