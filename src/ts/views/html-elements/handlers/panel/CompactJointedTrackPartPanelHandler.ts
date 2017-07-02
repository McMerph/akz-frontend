import { JointedTrackPartCompactRepresentation } from "../../../../domain/JointedTrackPartCompactRepresentation";
import { JournalController } from "../../../../controllers/JournalController";
import { CollapsiblePanelHandler } from "../basic/panel/CollapsiblePanelHandler";
import { CompactJointedTrackPartFormHandler } from "../form/CompactJointedTrackPartFormHandler";

export class CompactJointedTrackPartPanelHandler extends CollapsiblePanelHandler {

	private static readonly ID_PREFIX: string = "jointed-track-part-compact-representations-";
	private static readonly DEFINITION_PREFIX = "Звено";

	private readonly compactJointedTrackPartFormHandler: CompactJointedTrackPartFormHandler;

	public constructor(jointedTrackPartCompactRepresentation: JointedTrackPartCompactRepresentation, journalController: JournalController) {
		let id: number = jointedTrackPartCompactRepresentation.getId();
		super(`${CompactJointedTrackPartPanelHandler.ID_PREFIX}${id}`);

		this.compactJointedTrackPartFormHandler = new CompactJointedTrackPartFormHandler(jointedTrackPartCompactRepresentation, journalController);

		this
			.addChildNodesToAnchor(
			document.createTextNode(`${CompactJointedTrackPartPanelHandler.DEFINITION_PREFIX} ${jointedTrackPartCompactRepresentation.getDefinition()}`),
			document.createElement("br"),
			document.createTextNode(jointedTrackPartCompactRepresentation.getCreationDate()))
			.addChildNodesToBody(this.compactJointedTrackPartFormHandler.getHtmlElement())
			.setPanelBodyClass()
			.collapse();
		if (jointedTrackPartCompactRepresentation.isValid()) {
			this.addDefaultPanelStyle();
		} else {
			this.addWarningPanelStyle();
		}
	}

	protected getConcreteHandler(): CompactJointedTrackPartPanelHandler {
		return this;
	}

}
