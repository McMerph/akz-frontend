import { HtmlElementHandler } from "./HtmlElementHandler";
import { AlertHandler } from "./AlertHandler";

export class FixedTopHandler extends HtmlElementHandler<HTMLDivElement, FixedTopHandler> {

	private static readonly MAX_NODES = 3;
	private static readonly TIMEOUT = "3000";
	private static uniqueInstance: FixedTopHandler;

	private readonly fixedTop: HTMLDivElement;

	private constructor() {
		let fixedTop: HTMLDivElement = document.createElement("div");
		fixedTop.style.position = "fixed";
		fixedTop.style.top = "0";
		fixedTop.style.left = "0";
		fixedTop.style.width = "100%";
		fixedTop.style.padding = "10px";
		fixedTop.style.zIndex = "10";

		super(fixedTop);
		this.fixedTop = fixedTop;
	}

	public static getInstance(): FixedTopHandler {
		if (!FixedTopHandler.uniqueInstance) {
			FixedTopHandler.uniqueInstance = new FixedTopHandler();
		}

		return FixedTopHandler.uniqueInstance;
	}

	public static appendToBody(): void {
		FixedTopHandler.getInstance();
		document.body.appendChild(FixedTopHandler.uniqueInstance.getHtmlElement());
	}

	public addInfoAlert(info: string): Node {
		let infoAlert: Node = AlertHandler.getInfoAlert(info);
		this.addAutoRemoveNode(infoAlert);
		return infoAlert;
	}

	public addWarningAlert(warning: string): Node {
		let warningAlert: Node = AlertHandler.getWarningAlert(warning);
		this.prependNode(warningAlert);
		return warningAlert;
	}

	public deleteNodes(...nodes: Node[]): void {
		for (let node of nodes) {
			for (let i = 0; i < this.fixedTop.childNodes.length; i++) {
				if (this.fixedTop.childNodes[i] === node) {
					this.fixedTop.removeChild(node);
				}
			}
		}
	}

	private addAutoRemoveNode(node: Node): void {
		this.prependNode(node);
		setTimeout(() => this.deleteNodes(node), FixedTopHandler.TIMEOUT);
	}

	private prependNode(node: Node): void {
		while (this.fixedTop.childNodes.length >= FixedTopHandler.MAX_NODES) {
			this.fixedTop.removeChild(this.fixedTop.lastChild);
		}
		this.addBeforeFirstChild(node);
	}

	protected getConcreteHandler(): FixedTopHandler {
		return this;
	}

}
