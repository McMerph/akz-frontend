import { HtmlElementHandler } from "./HtmlElementHandler";
import { SearchRequest } from "../../../../domain/SearchRequest";
import { ViewHelper } from "../../../ViewHelper";
import { Icons } from "../../Icons";

export class DateTimePickerHandler extends HtmlElementHandler<HTMLDivElement, DateTimePickerHandler> {

	public static readonly DATA_ATTRIBUTE: string = "DateTimePicker";
	public static readonly LOCALE: string = "ru";

	private readonly div: HTMLDivElement;

	public constructor() {
		let div: HTMLDivElement = document.createElement("div");
		super(div);
		this.div = div;
		this.transform();
	}

	public setDate(date: string): DateTimePickerHandler {
		$(this.div).data(DateTimePickerHandler.DATA_ATTRIBUTE).date(date);
		return this;
	}

	public getDate(): string {
		return $(this.div).data(DateTimePickerHandler.DATA_ATTRIBUTE).date().format(SearchRequest.DATE_TIME_FORMAT);
	}

	private transform(): void {
		$(this.div).datetimepicker({
			inline: true,
			sideBySide: true,
			locale: DateTimePickerHandler.LOCALE,
			format: SearchRequest.DATE_TIME_FORMAT,
			icons: {
				time: ViewHelper.getSpaceSeparatedClasses(Icons.TIME),
				date: ViewHelper.getSpaceSeparatedClasses(Icons.CALENDAR),
				up: ViewHelper.getSpaceSeparatedClasses(Icons.CHEVRON_UP),
				down: ViewHelper.getSpaceSeparatedClasses(Icons.CHEVRON_DOWN),
				previous: ViewHelper.getSpaceSeparatedClasses(Icons.CHEVRON_LEFT),
				next: ViewHelper.getSpaceSeparatedClasses(Icons.CHEVRON_RIGHT),
				today: ViewHelper.getSpaceSeparatedClasses(Icons.CROSSHAIR),
				clear: ViewHelper.getSpaceSeparatedClasses(Icons.TRASH),
				close: ViewHelper.getSpaceSeparatedClasses(Icons.TIMES)
			}
		});
	}

	protected getConcreteHandler(): DateTimePickerHandler {
		return this;
	}

}
