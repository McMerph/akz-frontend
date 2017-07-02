import { HtmlElementHandler } from "../HtmlElementHandler";
import { TableRowHandler } from "./TableRowHandler";

export class TableBodyHandler extends HtmlElementHandler<HTMLTableSectionElement, TableBodyHandler> {

	private readonly tableBody: HTMLTableSectionElement;

	public constructor() {
		let tableBody: HTMLTableSectionElement = document.createElement("tbody");
		super(tableBody);

		this.tableBody = tableBody;
	}

	public addRow(row: TableRowHandler): TableBodyHandler {
		this.embed(row);
		return this;
	}

	protected getConcreteHandler(): TableBodyHandler {
		return this;
	}

}
