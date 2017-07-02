import { HtmlElementHandler } from "../basic/HtmlElementHandler";
import { SearchRequest } from "../../../../domain/SearchRequest";
import { JournalController } from "../../../../controllers/JournalController";
import { Icons } from "../../Icons";
import { ButtonHandler } from "../basic/ButtonHandler";
import { FormGroupHandler } from "../basic/form/FormGroupHandler";
import { FormHandler } from "../basic/form/FormHandler";
import { InputType } from "../basic/InputHandler";
import { InputHandler } from "../basic/InputHandler";
import { DateTimePickerHandler } from "../basic/DateTimePickerHandler";

export class SearchRequestFormHandler extends FormHandler {

	private static readonly FIRST_RESULT: string = "Смещение";
	private static readonly MAX_RESULTS: string = "Показать по";
	private static readonly MIN_DATE: string = "Найти звенья с";
	private static readonly MAX_DATE: string = "по";
	private static readonly ENTER_KEY_CODE: number = 13;

	private dateTimeMinPickerHandler: DateTimePickerHandler;
	private dateTimeMaxPickerHandler: DateTimePickerHandler;
	private firstResultInputHandler: InputHandler;
	private maxResultsInputHandler: InputHandler;

	public constructor(searchRequest: SearchRequest, journalController: JournalController) {
		super();
		this.initializeHandlers(searchRequest, journalController);
		this.initializeForm(journalController);
	}

	public setDateMin(date: string): SearchRequestFormHandler {
		this.dateTimeMinPickerHandler.setDate(date);
		return this;
	}

	public setDateMax(date: string): SearchRequestFormHandler {
		this.dateTimeMaxPickerHandler.setDate(date);
		return this;
	}

	public setFirstResult(firstResult: number): SearchRequestFormHandler {
		this.firstResultInputHandler.setValue(firstResult.toString());
		return this;
	}

	public setMaxResults(maxResults: number): SearchRequestFormHandler {
		this.maxResultsInputHandler.setValue(maxResults.toString());
		return this;
	}

	public getSearchRequest(): SearchRequest {
		let searchRequest: SearchRequest = new SearchRequest();
		let dateMin: string = this.dateTimeMinPickerHandler.getDate();
		let dateMax: string = this.dateTimeMaxPickerHandler.getDate();
		searchRequest.setDateMin(dateMin);
		searchRequest.setDateMax(dateMax);
		searchRequest.setFirstResult(parseInt(this.firstResultInputHandler.getValue()));
		searchRequest.setMaxResults(parseInt(this.maxResultsInputHandler.getValue()));

		return searchRequest;
	}

	protected getConcreteHandler(): SearchRequestFormHandler {
		return this;
	}

	private initializeHandlers(searchRequest: SearchRequest, journalController: JournalController): void {
		this.dateTimeMinPickerHandler = new DateTimePickerHandler();
		this.dateTimeMaxPickerHandler = new DateTimePickerHandler();
		this.firstResultInputHandler = new InputHandler(InputType.number)
			.addFormControlStyle()
			.setPlaceholder(SearchRequestFormHandler.FIRST_RESULT)
			.setValue(searchRequest.getFirstResult().toString());
		this.maxResultsInputHandler = new InputHandler(InputType.number)
			.addFormControlStyle()
			.setPlaceholder(SearchRequestFormHandler.MAX_RESULTS)
			.setValue(searchRequest.getMaxResults().toString());
	}

	private initializeForm(journalController: JournalController): void {
		this
			.embed(new FormGroupHandler()
				.addLabel(SearchRequestFormHandler.MIN_DATE)
				.addRelativePositionNode(this.dateTimeMinPickerHandler.getHtmlElement()))
			.embed(new FormGroupHandler()
				.addLabel(SearchRequestFormHandler.MAX_DATE)
				.addRelativePositionNode(this.dateTimeMaxPickerHandler.getHtmlElement()))
			.embed(new FormGroupHandler()
				.addLabel(SearchRequestFormHandler.FIRST_RESULT)
				.embed(this.firstResultInputHandler))
			.embed(new FormGroupHandler()
				.addLabel(SearchRequestFormHandler.MAX_RESULTS)
				.embed(this.maxResultsInputHandler));

		this.getForm().addEventListener("keydown", (event) => {
			event.preventDefault();
			if (event.keyCode == SearchRequestFormHandler.ENTER_KEY_CODE) {
				let searchRequest: SearchRequest = this.getSearchRequest();
				journalController.handleSearchRequestSubmit(searchRequest);
			}
		});
	}
}
