import { JointedTrackPart } from "../domain/JointedTrackPart";
import { JointedTrackPartPassport } from "../domain/JointedTrackPartPassport";
import { HtmlElementHandler } from "./html-elements/handlers/basic/HtmlElementHandler";
import { HeadingType } from "./html-elements/handlers/basic/HeadingHandler";
import { HeadingHandler } from "./html-elements/handlers/basic/HeadingHandler";
import { ContainerHandler } from "./html-elements/handlers/basic/ContainerHandler";
import { BackFormHandler } from "./html-elements/handlers/form/BackFormHandler";
import { RutPropertiesTableHandler } from "./html-elements/handlers/table/RutPropertiesTableHandler";
import { SleepersPropertiesTableHandler } from "./html-elements/handlers/table/SleepersPropertiesTableHandler";
import { RutEntriesTableHandler } from "./html-elements/handlers/table/RutEntriesTableHandler";
import { SleepersGapsTableHandler } from "./html-elements/handlers/table/SleepersGapsTableHandler";
import { ResistanceMeasurementPropertiesTableHandler } from "./html-elements/handlers/table/ResistanceMeasurementPropertiesTableHandler";
import { OtherPropertiesTableHandler } from "./html-elements/handlers/table/OtherPropertiesTableHandler";
import { CollapsiblePanelHandler } from "./html-elements/handlers/basic/panel/CollapsiblePanelHandler";
import { RestApiView } from "./RestApiView";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiResponseEvent } from "../rest-api/RestApiResponseEvent";
import { PassportModel } from "../models/PassportModel";
import { PassportController } from "../controllers/PassportController";
import { RestApiError } from "../rest-api/RestApiError";
import { RestApiErrorEvent } from "../rest-api/RestApiErrorEvent";

export class PassportView extends RestApiView {

	private static readonly DEFINITION_PREFIX: string = "Паспорт звена";
	private static readonly RUT_WIDTH: string = "Ширина колеи";
	private static readonly SLEEPERS_GAPS: string = "Расстояния между шпалами";

	private static readonly RUT_ENTRIES_PANEL_HANDLER_ID = "rut-entries-properties";
	private static readonly SLEEPERS_GAPS_PANEL_HANDLER_ID = "sleepers-gaps-properties";

	private passportModel: PassportModel;
	private passportController: PassportController;

	private passportJointedTrackPartDefinitionHeadingHandler: HeadingHandler;
	private creationDateHeadingHandler: HeadingHandler;
	private rutPropertiesTableHandler: RutPropertiesTableHandler;
	private rutEntriesTableHandler: RutEntriesTableHandler;
	private rutEntriesPanelHandler: CollapsiblePanelHandler;
	private sleepersPropertiesTableHandler: SleepersPropertiesTableHandler;
	private sleepersGapsTableHandler: SleepersGapsTableHandler;
	private sleepersGapsPanelHandler: CollapsiblePanelHandler;
	private resistanceMeasurementPropertiesTableHandler: ResistanceMeasurementPropertiesTableHandler;
	private otherPropertiesTableHandler: OtherPropertiesTableHandler;
	private passportHandlers: HtmlElementHandler<any, any>[] = [];

	public constructor(passportController: PassportController, passportModel: PassportModel) {
		super();
		this.passportController = passportController;
		this.passportModel = passportModel;
		this.passportModel.registerRestApiResponseObserver(this);
		this.passportModel.registerRestApiErrorObserver(this);

		this.initializeDynamicHandlers();

		let containerHandler: ContainerHandler = new ContainerHandler()
			.embed(new BackFormHandler())
			.embed(this.getLoadHeadingHandler())
			.embed(this.getRestApiErrorHandler());
		this.passportHandlers.forEach(handler => containerHandler.embed(handler));
		this.addHtmlElements(containerHandler.getHtmlElement());

		this.hide();
		this.appendToBody();
	}

	// RestApiResponseObserver
	public onResponse(response: RestApiResponse): void {
		if (response.getEvent() === RestApiResponseEvent.PassportRetrieve) {
			this.onPassportRetrieve();
		}
	}

	// RestApiErrorObserver
	public onError(error: RestApiError): void {
		this.setRestApiErrorHandlerText(error.toString());
		this.setMessageState();
	}

	public setLoadState(): void {
		this.showLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.passportHandlers.forEach(handler => handler.hide());
	}

	private setMessageState(): void {
		this.hideLoadHeadingHandler();
		this.showRestApiErrorHandler();
		this.passportHandlers.forEach(handler => handler.hide());
	}

	private onPassportRetrieve(): void {
		let jointedTrackPartPassport: JointedTrackPartPassport = this.passportModel.getJointedTrackPartPassport();
		let jointedTrackPart: JointedTrackPart = jointedTrackPartPassport.getJointedTrackPart();

		this.passportJointedTrackPartDefinitionHeadingHandler.setText(`${PassportView.DEFINITION_PREFIX} ${jointedTrackPart.getDefinition()}`)
		this.creationDateHeadingHandler.setText(jointedTrackPart.getCreationDate());
		this.rutPropertiesTableHandler.update(jointedTrackPartPassport);
		this.rutEntriesTableHandler.update(jointedTrackPartPassport);
		this.sleepersPropertiesTableHandler.update(jointedTrackPartPassport);
		this.sleepersGapsTableHandler.update(jointedTrackPartPassport);
		this.resistanceMeasurementPropertiesTableHandler.update(jointedTrackPartPassport);
		this.otherPropertiesTableHandler.update(jointedTrackPartPassport);

		this.deleteWarningAlerts();
		this.setPassportState();
	}

	private setPassportState(): void {
		this.hideLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.passportHandlers.forEach(handler => handler.show());
	}

	private initializeDynamicHandlers(): void {
		this.passportJointedTrackPartDefinitionHeadingHandler = new HeadingHandler(HeadingType.h3)
			.setTextCenter()
			.setInfoStyle();
		this.creationDateHeadingHandler = new HeadingHandler(HeadingType.h4)
			.setTextCenter()
			.setInfoStyle();
		this.rutPropertiesTableHandler = new RutPropertiesTableHandler();
		this.rutEntriesTableHandler = new RutEntriesTableHandler();
		this.rutEntriesPanelHandler = new CollapsiblePanelHandler(PassportView.RUT_ENTRIES_PANEL_HANDLER_ID)
			.addChildNodesToAnchor(document.createTextNode(PassportView.RUT_WIDTH))
			.addChildNodesToBody(this.rutEntriesTableHandler.getHtmlElement())
			.addDefaultPanelStyle();
		this.sleepersPropertiesTableHandler = new SleepersPropertiesTableHandler();
		this.sleepersGapsTableHandler = new SleepersGapsTableHandler();
		this.sleepersGapsPanelHandler = new CollapsiblePanelHandler(PassportView.SLEEPERS_GAPS_PANEL_HANDLER_ID)
			.addChildNodesToAnchor(document.createTextNode(PassportView.SLEEPERS_GAPS))
			.addChildNodesToBody(this.sleepersGapsTableHandler.getHtmlElement())
			.addDefaultPanelStyle();
		this.resistanceMeasurementPropertiesTableHandler = new ResistanceMeasurementPropertiesTableHandler();
		this.otherPropertiesTableHandler = new OtherPropertiesTableHandler();

		this.passportHandlers.push(
			this.passportJointedTrackPartDefinitionHeadingHandler,
			this.creationDateHeadingHandler,
			this.rutPropertiesTableHandler,
			this.rutEntriesPanelHandler,
			this.sleepersPropertiesTableHandler,
			this.sleepersGapsPanelHandler,
			this.resistanceMeasurementPropertiesTableHandler,
			this.otherPropertiesTableHandler
		);
	}

}
