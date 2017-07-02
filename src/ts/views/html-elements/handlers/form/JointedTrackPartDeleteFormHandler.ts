import { JournalController } from "../../../../controllers/JournalController";
import { VerticalButtonGroupHandler } from "../basic/VerticalButtonGroupHandler";
import { Icons } from "../../Icons";
import { ButtonHandler } from "../basic/ButtonHandler";
import { FormGroupHandler } from "../basic/form/FormGroupHandler";
import { FormHandler } from "../basic/form/FormHandler";
import { ModalHandler } from "../basic/ModalHandler";

export class JointedTrackPartDeleteFormHandler extends FormHandler {

	private static readonly DELETE: string = "Удалить звено";
	private static readonly CANCEL: string = "Отмена";

	private modalHandler: ModalHandler = ModalHandler.getInstance();

	public constructor(id: number, journalController: JournalController) {
		super();

		let deleteButttonHandler: ButtonHandler = new ButtonHandler()
			.setSubmitType()
			.addWarningStyle()
			.addClonedNodes(Icons.TRASH)
			.addText(` ${JointedTrackPartDeleteFormHandler.DELETE}`);
		deleteButttonHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			journalController.deleteJointedTrackPart(id);
			this.modalHandler.hide();
		});

		let cancelButttonHandler: ButtonHandler = new ButtonHandler()
			.setButtonType()
			.addDefaultStyle()
			.addClonedNodes(Icons.TIMES)
			.addText(` ${JointedTrackPartDeleteFormHandler.CANCEL}`);
		cancelButttonHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			this.modalHandler.hide();
		});

		this.embed(
			new FormGroupHandler()
				.embed(new VerticalButtonGroupHandler()
					.embed(deleteButttonHandler)
					.embed(cancelButttonHandler)
				));
	}

	protected getConcreteHandler(): JointedTrackPartDeleteFormHandler {
		return this;
	}

}
