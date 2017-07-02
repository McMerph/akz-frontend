import { HtmlElementHandler } from "../HtmlElementHandler";
import { TableBodyHandler } from "./TableBodyHandler";
import { TableRowHandler } from "./TableRowHandler";

export class TableHandler extends HtmlElementHandler<HTMLTableElement, TableHandler> {

	private readonly table: HTMLTableElement;
	private readonly tableBodyHandler: TableBodyHandler;

	public constructor() {
		let table: HTMLTableElement = document.createElement("table");
		table.classList.add("table", "table-hover", "table-striped");
		super(table);

		this.table = table;
		this.tableBodyHandler = new TableBodyHandler();
		table.appendChild(this.tableBodyHandler.getHtmlElement());
	}

	public addHead(colSpan: number, text: string): TableHandler {
		let tableHeaderCell: HTMLTableHeaderCellElement = document.createElement("th");
		tableHeaderCell.colSpan = colSpan;
		tableHeaderCell.appendChild(document.createTextNode(text));

		let tableRow: HTMLTableRowElement = document.createElement("tr");
		tableRow.appendChild(tableHeaderCell);

		let tableHead: HTMLTableSectionElement = document.createElement("thead");
		tableHead.appendChild(tableRow);

		this.addBeforeFirstChild(tableHead);

		return this;
	}

	public clearBody(): TableHandler {
		this.tableBodyHandler.removeChilds();
		return this;
	}

	public addRow(row: TableRowHandler): TableHandler {
		this.tableBodyHandler.addRow(row);
		return this;
	}

	protected getConcreteHandler(): TableHandler {
		return this;
	}

}
