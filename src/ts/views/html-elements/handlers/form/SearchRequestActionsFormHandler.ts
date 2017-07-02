import { SearchRequest } from "../../../../domain/SearchRequest";
import { SearchRequestPanelHandler } from "../panel/SearchRequestPanelHandler";
import { JournalController } from "../../../../controllers/JournalController";
import { Icons } from "../../Icons";
import { HorizontalButtonGroupHandler } from "../basic/HorizontalButtonGroupHandler";
import { ButtonHandler } from "../basic/ButtonHandler";
import { FormGroupHandler } from "../basic/form/FormGroupHandler";
import { FormHandler } from "../basic/form/FormHandler";

export class SearchRequestActionsFormHandler extends FormHandler {

	public constructor(searchRequestPanelHandler: SearchRequestPanelHandler, journalController: JournalController) {
		super();
		this
			.embed(new FormGroupHandler()
				.embed(new HorizontalButtonGroupHandler()
					.embedButton(this.getResetButtonHandler(journalController))
					.embedButton(this.getSearchButtonHandler(journalController, searchRequestPanelHandler))));
	}

	protected getConcreteHandler(): SearchRequestActionsFormHandler {
		return this;
	}

	private getResetButtonHandler(journalController: JournalController): ButtonHandler {
		let resetButttonHandler: ButtonHandler = new ButtonHandler()
			.setButtonType()
			.addWarningStyle()
			.addClonedNodes(Icons.REFRESH)
			.addText(" Сброс");

		resetButttonHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			journalController.handleSearchRequestReset();
		});

		return resetButttonHandler;
	}

	private getSearchButtonHandler(journalController: JournalController, searchRequestPanelHandler: SearchRequestPanelHandler): ButtonHandler {
		let searchButtonHandler: ButtonHandler = new ButtonHandler()
			.setButtonType()
			.addPrimaryStyle()
			.addClonedNodes(Icons.SEARCH)
			.addText(" Поиск");

		searchButtonHandler.getHtmlElement().addEventListener("click", (event) => {
			event.preventDefault();
			let searchRequest: SearchRequest = searchRequestPanelHandler.getSearchRequest();
			journalController.handleSearchRequestSubmit(searchRequest);
		});

		return searchButtonHandler;
	}

}
