import { JointedTrackPart } from "../domain/JointedTrackPart";
import { HeadingType } from "./html-elements/handlers/basic/HeadingHandler";
import { HeadingHandler } from "./html-elements/handlers/basic/HeadingHandler";
import { ContainerHandler } from "./html-elements/handlers/basic/ContainerHandler";
import { BackFormHandler } from "./html-elements/handlers/form/BackFormHandler";
import { JointedTrackPartFormHandler } from "./html-elements/handlers/form/JointedTrackPartFormHandler";
import { RestApiView } from "./RestApiView";
import { EditingModel } from "../models/EditingModel";
import { EditingController } from "../controllers/EditingController";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiResponseEvent } from "../rest-api/RestApiResponseEvent";
import { RestApiError } from "../rest-api/RestApiError";
import { RestApiErrorEvent } from "../rest-api/RestApiErrorEvent";

export class EditingView extends RestApiView {

	private static readonly HEADER_TEXT: string = "Редактирование звена";
	private static readonly SUCCESS_EDIT_TEXT: string = "Звено успешно отредактировано";

	private static readonly RUT_ENTRIES_ARRAY_ARRAY_PANEL_ID: string = "rut-entries-array-edit-panel";
	private static readonly RUT_ENTRIES_ARRAY_TABLE_ID: string = "rut-entries-array-edit-table";
	private static readonly SLEEPERS_GAPS_ARRAY_ARRAY_PANEL_ID: string = "sleepers-gaps-array-edit-panel";
	private static readonly SLEEPERS_GAPS_ARRAY_TABLE_ID: string = "sleepers-gaps-array-edit-table";

	private jointedTrackPartEditFormHandler: JointedTrackPartFormHandler;

	private editingModel: EditingModel;
	private editingController: EditingController;

	public constructor(editingController: EditingController, editingModel: EditingModel) {
		super();
		this.editingController = editingController;
		this.editingModel = editingModel;
		this.editingModel.registerRestApiResponseObserver(this);
		this.editingModel.registerRestApiErrorObserver(this);

		this.initializeDynamicHandlers();

		this.addHtmlElements(new ContainerHandler()
			.embed(new BackFormHandler())
			.embed(new HeadingHandler(HeadingType.h3)
				.setTextCenter()
				.setInfoStyle()
				.setText(EditingView.HEADER_TEXT))
			.embed(this.getRestApiErrorHandler())
			.embed(this.getLoadHeadingHandler())
			.embed(this.jointedTrackPartEditFormHandler)
			.getHtmlElement());

		this.hide();
		this.appendToBody();
	}

	// RestApiResponseObserver
	public onResponse(response: RestApiResponse): void {
		if (response.getEvent() === RestApiResponseEvent.JointedTrackPartRetrieve) {
			let jointedTrackPart: JointedTrackPart = this.editingModel.getJointedTrackPart();
			this.jointedTrackPartEditFormHandler.update(jointedTrackPart);
			this.deleteWarningAlerts();
			this.setEditState();
		} else if (response.getEvent() === RestApiResponseEvent.JointedTrackPartUpdate) {
			this.setInfoAlert(EditingView.SUCCESS_EDIT_TEXT);
			this.setEditState();
		}
	}

	// RestApiErrorObserver
	public onError(error: RestApiError): void {
		if (error.getEvent() === RestApiErrorEvent.BadRequest) {
			this.addWarningAlert(error.toString());
			this.setEditState();
		} else {
			this.setRestApiErrorHandlerText(error.toString());
			this.setMessageState();
		}
	}

	public setLoadState(): void {
		this.showLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.jointedTrackPartEditFormHandler.hide();
	}

	private setEditState(): void {
		this.hideLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.jointedTrackPartEditFormHandler.show();
	}

	private setMessageState(): void {
		this.hideLoadHeadingHandler();
		this.showRestApiErrorHandler();
		this.jointedTrackPartEditFormHandler.hide();
	}

	private initializeDynamicHandlers(): void {
		this.jointedTrackPartEditFormHandler = new JointedTrackPartFormHandler({
			jointedTrackPartController: this.editingController,
			rutEntriesArrayArrayPanelId: EditingView.RUT_ENTRIES_ARRAY_ARRAY_PANEL_ID,
			rutEntriesArrayTableId: EditingView.RUT_ENTRIES_ARRAY_TABLE_ID,
			sleepersGapsArrayArrayPanelId: EditingView.SLEEPERS_GAPS_ARRAY_ARRAY_PANEL_ID,
			sleepersGapsArrayTableId: EditingView.SLEEPERS_GAPS_ARRAY_TABLE_ID
		});
	}

}
