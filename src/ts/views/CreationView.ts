import { JointedTrackPart } from "../domain/JointedTrackPart";
import { CreationModel } from "../models/CreationModel";
import { CreationController } from "../controllers/CreationController";
import { HeadingType } from "./html-elements/handlers/basic/HeadingHandler";
import { HeadingHandler } from "./html-elements/handlers/basic/HeadingHandler";
import { ContainerHandler } from "./html-elements/handlers/basic/ContainerHandler";
import { BackFormHandler } from "./html-elements/handlers/form/BackFormHandler";
import { JointedTrackPartFormHandler } from "./html-elements/handlers/form/JointedTrackPartFormHandler";
import { RestApiView } from "./RestApiView";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiResponseEvent } from "../rest-api/RestApiResponseEvent";
import { RestApiError } from "../rest-api/RestApiError";
import { RestApiErrorEvent } from "../rest-api/RestApiErrorEvent";

export class CreationView extends RestApiView {

	private static readonly HEADER_TEXT: string = "Создание звена";
	private static readonly SUCCESS_CREATE_TEXT: string = "Звено успешно создано";

	private static readonly RUT_ENTRIES_ARRAY_ARRAY_PANEL_ID: string = "rut-entries-array-create-panel";
	private static readonly RUT_ENTRIES_ARRAY_TABLE_ID: string = "rut-entries-array-create-table";
	private static readonly SLEEPERS_GAPS_ARRAY_ARRAY_PANEL_ID: string = "sleepers-gaps-array-create-panel";
	private static readonly SLEEPERS_GAPS_ARRAY_TABLE_ID: string = "sleepers-gaps-array-create-table";

	private jointedTrackPartCreateFormHandler: JointedTrackPartFormHandler;

	private creationModel: CreationModel;
	private creationController: CreationController;

	public constructor(creationController: CreationController, creationModel: CreationModel) {
		super();
		this.creationController = creationController;
		this.creationModel = creationModel;
		this.creationModel.registerRestApiResponseObserver(this);
		this.creationModel.registerRestApiErrorObserver(this);

		this.initializeDynamicHandlers();

		this.addHtmlElements(new ContainerHandler()
			.embed(new BackFormHandler())
			.embed(new HeadingHandler(HeadingType.h3)
				.setTextCenter()
				.setInfoStyle()
				.setText(CreationView.HEADER_TEXT))
			.embed(this.getRestApiErrorHandler())
			.embed(this.getLoadHeadingHandler())
			.embed(this.jointedTrackPartCreateFormHandler)
			.getHtmlElement());

		this.hide();
		this.appendToBody();
	}

	// RestApiErrorObserver
	public onError(error: RestApiError): void {
		this.addWarningAlert(error.toString());
		this.setCreateState();
	}

	// RestApiResponseObserver
	public onResponse(response: RestApiResponse): void {
		if (response.getEvent() === RestApiResponseEvent.JointedTrackPartCreate) {
			this.setInfoAlert(CreationView.SUCCESS_CREATE_TEXT);
			this.setCreateState();
		}
	}

	public getJointedTrackPart(): JointedTrackPart {
		return this.jointedTrackPartCreateFormHandler.getJointedTrackPart();
	}

	public setLoadState(): void {
		this.showLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.jointedTrackPartCreateFormHandler.hide();
	}

	public setCreateState(): void {
		this.hideLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.jointedTrackPartCreateFormHandler.show();
	}

	private setMessageState(): void {
		this.hideLoadHeadingHandler();
		this.showRestApiErrorHandler();
		this.jointedTrackPartCreateFormHandler.hide();
	}

	private initializeDynamicHandlers(): void {
		this.jointedTrackPartCreateFormHandler = new JointedTrackPartFormHandler({
			jointedTrackPartController: this.creationController,
			rutEntriesArrayArrayPanelId: CreationView.RUT_ENTRIES_ARRAY_ARRAY_PANEL_ID,
			rutEntriesArrayTableId: CreationView.RUT_ENTRIES_ARRAY_TABLE_ID,
			sleepersGapsArrayArrayPanelId: CreationView.SLEEPERS_GAPS_ARRAY_ARRAY_PANEL_ID,
			sleepersGapsArrayTableId: CreationView.SLEEPERS_GAPS_ARRAY_TABLE_ID
		});
	}

}
