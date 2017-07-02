import { JointedTrackPartCompactRepresentation } from "../../../../domain/JointedTrackPartCompactRepresentation";
import { JournalController } from "../../../../controllers/JournalController";
import { VerticalButtonGroupHandler } from "../basic/VerticalButtonGroupHandler";
import { Icons } from "../../Icons";
import { AnchorHandler } from "../basic/AnchorHandler";
import { ButtonHandler } from "../basic/ButtonHandler";
import { FormGroupHandler } from "../basic/form/FormGroupHandler";
import { FormHandler } from "../basic/form/FormHandler";
import { ModalHandler } from "../basic/ModalHandler";
import { Router } from "../../../../Router";
import { JointedTrackPartDeleteFormHandler } from "./JointedTrackPartDeleteFormHandler";

export class CompactJointedTrackPartFormHandler extends FormHandler {

	private static readonly SHOW_PASSPORT: string = "Посмотреть паспорт";
	private static readonly GET_PASSPORT: string = "Скачать паспорт в xlsx";
	private static readonly EDIT_PART: string = "Редактировать звено";
	private static readonly DELETE_PART: string = "Удалить звено";
	private static readonly DELETE_WARNING: string = "Вы уверены, что хотите удалить звено?";

	private modalHandler: ModalHandler = ModalHandler.getInstance();

	public constructor(jointedTrackPartCompactRepresentation: JointedTrackPartCompactRepresentation, journalController: JournalController) {
		super();

		let passportButttonHandler: ButtonHandler = new ButtonHandler()
			.setButtonType()
			.addPrimaryStyle()
			.addClonedNodes(Icons.TEXT)
			.addText(` ${CompactJointedTrackPartFormHandler.SHOW_PASSPORT}`);
		passportButttonHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			Router.getInstance().routeToPassportView(jointedTrackPartCompactRepresentation.getId());
		});

		let anchorHandler: AnchorHandler = new AnchorHandler(journalController.getJointedTrackPartPassportResourceUrl(jointedTrackPartCompactRepresentation))
			.addDefaultButtonStyle()
			.setBlankTarget()
			.addClonedNodes(Icons.XLSX)
			.addText(` ${CompactJointedTrackPartFormHandler.GET_PASSPORT}`);

		let editButttonHandler: ButtonHandler = new ButtonHandler()
			.setButtonType()
			.addDefaultStyle()
			.addClonedNodes(Icons.PENCIL)
			.addText(` ${CompactJointedTrackPartFormHandler.EDIT_PART}`);
		editButttonHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			Router.getInstance().routeToEditingView(jointedTrackPartCompactRepresentation.getId());
		});

		let deleteButttonHandler: ButtonHandler = new ButtonHandler()
			.setButtonType()
			.addWarningStyle()
			.addClonedNodes(Icons.TRASH)
			.addText(` ${CompactJointedTrackPartFormHandler.DELETE_PART}`);
		deleteButttonHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			let id: number = jointedTrackPartCompactRepresentation.getId();
			let deleteForm: HTMLFormElement = new JointedTrackPartDeleteFormHandler(id, journalController).getHtmlElement();
			this.modalHandler.update(CompactJointedTrackPartFormHandler.DELETE_WARNING, deleteForm);
			this.modalHandler.show();
		});

		this.embed(
			new FormGroupHandler()
				.embed(new VerticalButtonGroupHandler()
					.embed(passportButttonHandler)
					.embed(anchorHandler)
					.embed(editButttonHandler)
					.embed(deleteButttonHandler))
		);
	}

	protected getConcreteHandler(): CompactJointedTrackPartFormHandler {
		return this;
	}

}
