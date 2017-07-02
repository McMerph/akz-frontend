import { ViewHelper } from "../../../../ViewHelper";
import { HtmlElementHandler } from "../HtmlElementHandler";
import { AnchorHandler } from "../AnchorHandler";
import { HeadingType } from "../HeadingHandler";
import { HeadingHandler } from "../HeadingHandler";

export class CollapsiblePanelHandler extends HtmlElementHandler<HTMLDivElement, CollapsiblePanelHandler> {

	private readonly collapsiblePanel: HTMLDivElement;
	private readonly anchorHandler: AnchorHandler;
	private readonly collapsiblePanelBody: HTMLDivElement;

	public constructor(id: string) {
		let collapsiblePanel = document.createElement("div");
		collapsiblePanel.classList.add("panel");

		let anchorHandler: AnchorHandler = new AnchorHandler(ViewHelper.getSelectorById(id));
		let anchor: HTMLAnchorElement = anchorHandler.getHtmlElement();
		anchor.setAttribute("data-toggle", "collapse");

		let anchorHeading: HTMLHeadingElement = new HeadingHandler(HeadingType.h3)
			.addClasses("panel-title")
			.addNodes(anchor)
			.getHtmlElement();

		let collapsiblePanelHeading: HTMLDivElement = document.createElement("div");
		collapsiblePanelHeading.classList.add("panel-heading");
		collapsiblePanelHeading.appendChild(anchorHeading);

		let collapsiblePanelBody: HTMLDivElement = document.createElement("div");
		collapsiblePanelBody.id = id;
		collapsiblePanelBody.classList.add("panel-collapse", "collapse");

		collapsiblePanel.appendChild(collapsiblePanelHeading);
		collapsiblePanel.appendChild(collapsiblePanelBody);

		super(collapsiblePanel);
		this.collapsiblePanelBody = collapsiblePanelBody;
		this.collapsiblePanel = collapsiblePanel;
		this.anchorHandler = anchorHandler;
	}

	public addDefaultPanelStyle(): CollapsiblePanelHandler {
		this.addClasses("panel-default");
		return this;
	}

	public addWarningPanelStyle(): CollapsiblePanelHandler {
		this.addClasses("panel-warning");
		return this;
	}

	public addChildNodesToAnchor(...additions: Node[]): CollapsiblePanelHandler {
		this.anchorHandler.addNodes(...additions);
		return this;
	}

	public addChildNodesToBody(...additions: Node[]): CollapsiblePanelHandler {
		for (let addition of additions) {
			this.collapsiblePanelBody.appendChild(addition);
		}
		return this;
	}

	public setParentId(parentId: string): CollapsiblePanelHandler {
		this.anchorHandler.getHtmlElement().setAttribute("data-parent", ViewHelper.getSelectorById(parentId));
		return this;
	}

	public setPanelBodyClass(): CollapsiblePanelHandler {
		this.collapsiblePanelBody.classList.add("panel-body");
		return this;
	}

	public expand(): CollapsiblePanelHandler {
		this.collapsiblePanelBody.classList.add("in");
		return this;
	}

	public collapse(): CollapsiblePanelHandler {
		this.collapsiblePanelBody.classList.remove("in");
		return this;
	}

	protected getConcreteHandler(): CollapsiblePanelHandler {
		return this;
	}

}
