import { ViewHelper } from "../../../ViewHelper";

/**
 * When this Class is initialized by a SubClass, type H refers
 * to a SubClass. When this Class is initialized by a SubSubClass,
 * type H anyway refers to a SubClass, not to a SubSubClass.
 * Therefore, even if the SubSubClass method returns SubSubClass
 * type, method chaining to other methods of this SubSubClass
 * will not work. However method chaining to methods of SubClass
 * and this root Class will work.
 */
export abstract class HtmlElementHandler<E extends HTMLElement, H extends HtmlElementHandler<E, H>> {

	private readonly htmlElement: E;

	public constructor(htmlElement: E) {
		this.htmlElement = htmlElement;
	}

	protected abstract getConcreteHandler(): H;

	public embed<E2 extends HTMLElement, H2 extends HtmlElementHandler<E2, H2>>(embedding: HtmlElementHandler<E2, H2>): H {
		this.addNode(embedding.getHtmlElement());
		return this.getConcreteHandler();
	}

	public setId(id: string): H {
		this.htmlElement.id = id;
		return this.getConcreteHandler();
	}

	public removeChilds(): H {
		while (this.htmlElement.hasChildNodes()) {
			this.htmlElement.removeChild(this.htmlElement.firstChild);
		}
		return this.getConcreteHandler();
	}

	public addRelativePositionNode(addition: Node): H {
		let div = document.createElement("div");
		div.style.position = "relative";
		div.appendChild(addition);
		this.htmlElement.appendChild(div);
		return this.getConcreteHandler();
	}

	public addBeforeFirstChild(addition: Node): H {
		this.htmlElement.insertBefore(addition, this.htmlElement.firstChild);
		return this.getConcreteHandler();
	}

	public addNodes(...additions: Node[]): H {
		for (let addition of additions) {
			this.addNode(addition);
		}
		return this.getConcreteHandler();
	}

	public updateChilds(...additions: Node[]): H {
		this.removeChilds();
		this.addNodes(...additions);
		return this.getConcreteHandler();
	}

	public addClonedNodes(...additions: Node[]): H {
		for (let addition of additions) {
			this.addClonedNode(addition);
		}
		return this.getConcreteHandler();
	}

	public addText(text: string): H {
		this.htmlElement.appendChild(document.createTextNode(text));
		return this.getConcreteHandler();
	}

	public addFormControlStyle(...classes: string[]): H {
		this.addClasses("form-control");
		return this.getConcreteHandler();
	}

	public addClasses(...classes: string[]): H {
		this.htmlElement.classList.add(...classes);
		return this.getConcreteHandler();
	}

	public removeFormControlStyle(...classes: string[]): H {
		this.removeClasses("form-control");
		return this.getConcreteHandler();
	}

	public removeClasses(...classNames: string[]): H {
		this.htmlElement.classList.remove(...classNames);
		return this.getConcreteHandler();
	}

	public show(): H {
		ViewHelper.show(this.htmlElement);
		return this.getConcreteHandler();
	}

	public hide(): H {
		ViewHelper.hide(this.htmlElement);
		return this.getConcreteHandler();
	}

	public updateNodes(...nodes: Node[]): H {
		this.removeChilds();
		this.addNodes(...nodes);

		return this.getConcreteHandler();
	}

	public getHtmlElement(): E {
		return this.htmlElement;
	}

	public getSpaceSeparatedClasses(): string {
		return ViewHelper.getSpaceSeparatedClasses(this.htmlElement);
	}

	private addNode(addition: Node): void {
		this.htmlElement.appendChild(addition);
	}

	private addClonedNode(addition: Node): void {
		this.htmlElement.appendChild(addition.cloneNode(true));
	}

}
