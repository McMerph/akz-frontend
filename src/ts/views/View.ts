import { ViewHelper } from "./ViewHelper";
import { FixedTopHandler } from "./html-elements/handlers/basic/FixedTopHandler";

export abstract class View {

	private readonly fixedTopHandler: FixedTopHandler = FixedTopHandler.getInstance();

	private warningAlerts: Node[] = [];

	private htmlElements: HTMLElement[] = [];

	public addHtmlElements(...addition: HTMLElement[]): void {
		this.htmlElements.push(...addition);
	}

	public show(): void {
		this.htmlElements.forEach(node => ViewHelper.show(node));
	}

	public hide(): void {
		this.htmlElements.forEach(node => ViewHelper.hide(node));
	}

	public getHtmlElements(): HTMLElement[] {
		return this.htmlElements;
	}

	protected setInfoAlert(text: string): void {
		this.fixedTopHandler.deleteNodes(...this.warningAlerts);
		this.warningAlerts = [];
		this.fixedTopHandler.addInfoAlert(text);
	}

	protected addWarningAlert(text: string): void {
		let addedRestErrorAlert: Node = this.fixedTopHandler.addWarningAlert(text);
		this.warningAlerts.push(addedRestErrorAlert);
	}

	protected deleteWarningAlerts(): void {
		this.fixedTopHandler.deleteNodes(...this.warningAlerts);
		this.warningAlerts = [];
	}

	protected appendToBody(): void {
		this.htmlElements.forEach(viewNode => document.body.appendChild(viewNode));
	}

}