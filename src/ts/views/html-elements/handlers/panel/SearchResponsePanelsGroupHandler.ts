import { JournalController } from "../../../../controllers/JournalController";
import { JointedTrackPartCompactRepresentation } from "../../../../domain/JointedTrackPartCompactRepresentation";
import { CompactJointedTrackPartPanelHandler } from "./CompactJointedTrackPartPanelHandler";
import { PanelsGroupHandler } from "../basic/panel/PanelsGroupHandler";

export class SearchResponsePanelsGroupHandler extends PanelsGroupHandler {

	private static readonly PARENT_ID: string = "search-response-panels-group";

	private compactJointedTrackPartPanelHandlers: CompactJointedTrackPartPanelHandler[];

	public constructor() {
		super(SearchResponsePanelsGroupHandler.PARENT_ID);
	}

	public update(jointedTrackPartCompactRepresentations: JointedTrackPartCompactRepresentation[], journalController: JournalController): void {
		this.compactJointedTrackPartPanelHandlers = jointedTrackPartCompactRepresentations.map(representation => new CompactJointedTrackPartPanelHandler(representation, journalController));
		for (let handler of this.compactJointedTrackPartPanelHandlers) {
			handler.setParentId(SearchResponsePanelsGroupHandler.PARENT_ID);
		}
		this.updateChilds(...this.compactJointedTrackPartPanelHandlers.map(handler => handler.getHtmlElement()));
	}

	protected getConcreteHandler(): SearchResponsePanelsGroupHandler {
		return this;
	}

}
