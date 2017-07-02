import { HtmlElementHandler } from "./HtmlElementHandler";
import { ButtonHandler } from "./ButtonHandler";
import { Icons } from "../../Icons";

export enum AlertType {

	success,
	info,
	warning,
	danger

}

export class AlertHandler extends HtmlElementHandler<HTMLDivElement, AlertHandler> {

	private readonly alert: HTMLDivElement;

	public constructor(alertType: AlertType) {
		let alert: HTMLDivElement = document.createElement("div");
		alert.classList.add("alert", `alert-${AlertType[alertType]}`);

		super(alert);
		this.alert = alert;
	}

	public static getInfoAlert(info: string): HTMLDivElement {
		return new AlertHandler(AlertType.info)
			.setDismissible()
			.addNodes(document.createTextNode(info))
			.getHtmlElement();
	}

	public static getWarningAlert(warning: string): HTMLDivElement {
		return new AlertHandler(AlertType.warning)
			.setDismissible()
			.addNodes(document.createTextNode(warning))
			.getHtmlElement();
	}

	public setDismissible(): AlertHandler {
		this.alert.classList.add("alert-dismissible");

		let dismissButton: HTMLButtonElement = new ButtonHandler()
			.setButtonType()
			.addClasses("close")
			.addClonedNodes(Icons.TIMES)
			.getHtmlElement();
		dismissButton.setAttribute("data-dismiss", "alert");
		this.alert.insertBefore(dismissButton, this.alert.firstChild);

		return this;
	}

	protected getConcreteHandler(): AlertHandler {
		return this;
	}

}
