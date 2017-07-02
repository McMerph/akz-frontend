import { SearchRequest } from "../../../../domain/SearchRequest";
import { JournalController } from "../../../../controllers/JournalController";
import { SearchRequestFormHandler } from "../form/SearchRequestFormHandler";
import { CollapsiblePanelHandler } from "../basic/panel/CollapsiblePanelHandler";

export class SearchRequestPanelHandler extends CollapsiblePanelHandler {

	private static readonly ID: string = "search-parameters";
	private static readonly CAPTION: string = "Параметры поиска";

	private readonly searchRequestFormHandler: SearchRequestFormHandler;

	public constructor(searchRequest: SearchRequest, journalController: JournalController) {
		super(SearchRequestPanelHandler.ID);

		this.searchRequestFormHandler = new SearchRequestFormHandler(searchRequest, journalController);
		this.searchRequestFormHandler.setDateMin(searchRequest.getDateMin());
		this.searchRequestFormHandler.setDateMax(searchRequest.getDateMax());

		this.addChildNodesToAnchor(document.createTextNode(SearchRequestPanelHandler.CAPTION))
			.addChildNodesToBody(this.searchRequestFormHandler.getHtmlElement())
			.setPanelBodyClass()
			.addDefaultPanelStyle()
			.collapse();
	}

	public setDateMin(date: string): SearchRequestPanelHandler {
		this.searchRequestFormHandler.setDateMin(date);
		return this;
	}

	public setDateMax(date: string): SearchRequestPanelHandler {
		this.searchRequestFormHandler.setDateMax(date);
		return this;
	}

	public setFirstResult(firstResult: number): SearchRequestPanelHandler {
		this.searchRequestFormHandler.setFirstResult(firstResult);
		return this;
	}

	public setMaxResults(maxResults: number): SearchRequestPanelHandler {
		this.searchRequestFormHandler.setMaxResults(maxResults);
		return this;
	}

	public getSearchRequest(): SearchRequest {
		return this.searchRequestFormHandler.getSearchRequest();
	}

	protected getConcreteHandler(): SearchRequestPanelHandler {
		return this;
	}

}
