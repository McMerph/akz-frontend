import { HtmlElementHandler } from "./HtmlElementHandler";

export enum InputType {

	text,
	number

}

export class InputHandler extends HtmlElementHandler<HTMLInputElement, InputHandler> {

	private readonly input: HTMLInputElement;

	public constructor(type: InputType) {
		let input: HTMLInputElement = document.createElement("input");
		input.type = InputType[type];

		super(input);
		this.input = input;
	}

	public setPlaceholder(placeholder: string): InputHandler {
		this.input.placeholder = placeholder;
		return this;
	}

	public setValue(value: string): InputHandler {
		this.input.value = value;
		return this;
	}

	public setStep(step: number): InputHandler {
		this.input.step = step.toString();
		return this;
	}

	public getValue(): string {
		return this.input.value;
	}

	protected getConcreteHandler(): InputHandler {
		return this;
	}

}
