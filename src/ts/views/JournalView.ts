import { JointedTrackPartCompactRepresentation } from "../domain/JointedTrackPartCompactRepresentation";
import { SearchRequest } from "../domain/SearchRequest";
import { SearchResponse } from "../domain/SearchResponse";
import { JournalModel } from "../models/JournalModel";
import { RestApiView } from "./RestApiView";
import { JournalController } from "../controllers/JournalController";
import { HtmlElementHandler } from "./html-elements/handlers/basic/HtmlElementHandler";
import { ContainerHandler } from "./html-elements/handlers/basic/ContainerHandler";
import { HeadingType } from "./html-elements/handlers/basic/HeadingHandler";
import { HeadingHandler } from "./html-elements/handlers/basic/HeadingHandler";
import { SearchResponsePanelsGroupHandler } from "./html-elements/handlers/panel/SearchResponsePanelsGroupHandler";
import { CreateJointedTrackPartFormHandler } from "./html-elements/handlers/form/CreateJointedTrackPartFormHandler";
import { SearchRequestPanelHandler } from "./html-elements/handlers/panel/SearchRequestPanelHandler";
import { SearchRequestActionsFormHandler } from "./html-elements/handlers/form/SearchRequestActionsFormHandler";
import { JointedTrackPartsNavHandler } from "./html-elements/handlers/JointedTrackPartsNavHandler";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiResponseEvent } from "../rest-api/RestApiResponseEvent";
import { RestApiError } from "../rest-api/RestApiError";
import { RestApiErrorEvent } from "../rest-api/RestApiErrorEvent";

//TODO Introduce journal queryParams? To make bookmarks?
export class JournalView extends RestApiView {

	private static readonly HEADER = "Журнал звеньев";
	private static readonly NOT_FOUND_POSTFIX = "не найдены";

	private searchRequestPanelHandler: SearchRequestPanelHandler;
	private searchRequestActionsFormHandler: SearchRequestActionsFormHandler;

	private datesInfoHeadingHandler: HeadingHandler;
	private searchResponsePanelGroupHandler: SearchResponsePanelsGroupHandler;
	private jointedTrackPartsNavHandler: JointedTrackPartsNavHandler;
	private searchHandlers: HtmlElementHandler<any, any>[] = [];

	private journalModel: JournalModel;
	private journalController: JournalController;

	public constructor(journalController: JournalController, journalModel: JournalModel) {
		super();
		this.journalController = journalController;
		this.journalModel = journalModel;
		this.journalModel.registerRestApiResponseObserver(this);
		this.journalModel.registerRestApiErrorObserver(this);

		this.initializeDynamicHandlers(journalModel.getSearchRequest());

		let containerHandler: ContainerHandler = new ContainerHandler()
			.embed(new HeadingHandler(HeadingType.h3)
				.setTextCenter()
				.setInfoStyle()
				.setText(JournalView.HEADER))
			.embed(new CreateJointedTrackPartFormHandler())
			.embed(this.searchRequestPanelHandler)
			.embed(this.searchRequestActionsFormHandler)
			.embed(this.getLoadHeadingHandler())
			.embed(this.getRestApiErrorHandler());
		this.searchHandlers.forEach(handler => containerHandler.embed(handler));
		this.addHtmlElements(containerHandler.getHtmlElement());

		this.hide();
		this.appendToBody();
	}

	// RestApiErrorObserver
	public onError(error: RestApiError): void {
		this.setRestApiErrorHandlerText(error.toString());
		this.setMessageState();
	}

	// RestApiResponseObserver
	public onResponse(response: RestApiResponse): void {
		if (response.getEvent() === RestApiResponseEvent.SearchResponseRetrieve) {
			this.onSearchResponseRetrieve();
		}
	}

	public getSearchRequest(): SearchRequest {
		return this.searchRequestPanelHandler.getSearchRequest();
	}

	public collapseSearchRequestPanel(): void {
		this.searchRequestPanelHandler.collapse();
	}

	public setLoadState(): void {
		this.showLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.searchHandlers.forEach(handler => handler.hide());
	}

	public setFoundState(): void {
		this.hideLoadHeadingHandler();
		this.hideRestApiErrorHandler();
		this.searchHandlers.forEach(handler => handler.show());
	}

	private setMessageState(): void {
		this.hideLoadHeadingHandler();
		this.showRestApiErrorHandler();
		this.searchHandlers.forEach(handler => handler.hide());
	}

	private onSearchResponseRetrieve(): void {
		let searchRequest: SearchRequest = this.journalModel.getSearchRequest();
		this.datesInfoHeadingHandler.setText(searchRequest.generateDatesInfo());
		this.searchRequestPanelHandler.setDateMin(searchRequest.getDateMin());
		this.searchRequestPanelHandler.setDateMax(searchRequest.getDateMax());
		this.searchRequestPanelHandler.setFirstResult(searchRequest.getFirstResult());
		this.searchRequestPanelHandler.setMaxResults(searchRequest.getMaxResults());

		let searchResponse: SearchResponse = this.journalModel.getSearchResponse();
		let jointedTrackPartCompactRepresentations: JointedTrackPartCompactRepresentation[] = searchResponse.getJointedTrackPartCompactRepresentations();
		this.searchResponsePanelGroupHandler.update(jointedTrackPartCompactRepresentations, this.journalController);
		if (searchResponse.getCount() > 0) {
			this.setFoundState();
		} else {
			this.setRestApiErrorHandlerText(`${searchRequest.generateDatesInfo()} ${JournalView.NOT_FOUND_POSTFIX}`);
			this.setMessageState();
		}

		this.jointedTrackPartsNavHandler.update();
	}

	private initializeDynamicHandlers(searchRequest: SearchRequest): void {
		this.searchRequestPanelHandler = new SearchRequestPanelHandler(searchRequest, this.journalController);
		this.searchRequestActionsFormHandler = new SearchRequestActionsFormHandler(this.searchRequestPanelHandler, this.journalController);
		this.datesInfoHeadingHandler = new HeadingHandler(HeadingType.h4)
			.setTextCenter()
			.setInfoStyle()
			.setText(searchRequest.generateDatesInfo());
		this.searchResponsePanelGroupHandler = new SearchResponsePanelsGroupHandler();
		this.jointedTrackPartsNavHandler = new JointedTrackPartsNavHandler(this.journalController, this.journalModel);

		this.searchHandlers.push(
			this.datesInfoHeadingHandler,
			this.searchResponsePanelGroupHandler,
			this.jointedTrackPartsNavHandler
		);
	}

}
