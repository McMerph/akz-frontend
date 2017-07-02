import { Icons } from "../../Icons";
import { HtmlElementHandler } from "./HtmlElementHandler";
import { ButtonHandler } from "./ButtonHandler";

export class ModalHandler extends HtmlElementHandler<HTMLDivElement, ModalHandler> {

	private static readonly MODAL_CLASSES = ["modal", "fade"];
	private static uniqueInstance: ModalHandler;

	private readonly modal: HTMLDivElement;
	private readonly modalContent: HTMLDivElement;

	private constructor() {
		let modal = document.createElement("div");
		modal.classList.add(...ModalHandler.MODAL_CLASSES);
		modal.setAttribute("tabindex", "-1");
		super(modal);

		let modalDialog = document.createElement("div");
		modalDialog.classList.add("modal-dialog");
		modal.appendChild(modalDialog);

		let modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");
		modalDialog.appendChild(modalContent);

		this.modal = modal;
		this.modalContent = modalContent;

		$(document).on("shown.bs.modal", (event: any) => {
			let inputs = ModalHandler.uniqueInstance.getHtmlElement().getElementsByTagName("input");
			let firstInput: HTMLInputElement = inputs[0];
			if (firstInput) {
				firstInput.focus();
				firstInput.select();
			}
		});
	}

	public static getInstance(): ModalHandler {
		if (!ModalHandler.uniqueInstance) {
			ModalHandler.uniqueInstance = new ModalHandler();
		}

		return ModalHandler.uniqueInstance;
	}

	public static appendToBody(): void {
		ModalHandler.getInstance();
		document.body.appendChild(ModalHandler.uniqueInstance.getHtmlElement());
	}

	public update(headerText: string, content: Node): ModalHandler {
		while (this.modalContent.hasChildNodes()) {
			this.modalContent.removeChild(this.modalContent.firstChild);
		}

		this.modalContent.appendChild(this.generateModalHeader(headerText));
		this.modalContent.appendChild(this.generateModalBody(content));
		return this;
	}

	public show(): ModalHandler {
		$(this.getHtmlElement()).modal("show");
		return this;
	}

	public hide(): ModalHandler {
		$(this.getHtmlElement()).modal("hide");
		return this;
	}

	protected getConcreteHandler(): ModalHandler {
		return this;
	}

	private generateModalHeader(headerText: string): HTMLDivElement {
		let header: HTMLHeadingElement = document.createElement("h4");
		header.classList.add("modal-title");
		header.appendChild(document.createTextNode(headerText));

		let modalHeader: HTMLDivElement = document.createElement("div");
		modalHeader.classList.add("modal-header");
		modalHeader.appendChild(this.generateDismissButton());
		modalHeader.appendChild(header);

		return modalHeader;
	}

	private generateDismissButton(): HTMLButtonElement {
		let dismissButton: HTMLButtonElement = new ButtonHandler()
			.setButtonType()
			.addClasses("close")
			.addClonedNodes(Icons.TIMES)
			.getHtmlElement();
		dismissButton.setAttribute("data-dismiss", "modal");

		return dismissButton;
	}

	private generateModalBody(content: Node): HTMLDivElement {
		let modalBody: HTMLDivElement = document.createElement("div");
		modalBody.classList.add("modal-body");
		modalBody.appendChild(content);

		return modalBody;
	}

}
