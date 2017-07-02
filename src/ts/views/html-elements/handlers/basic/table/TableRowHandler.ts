import { HtmlElementHandler } from "../HtmlElementHandler";

export class TableRowHandler extends HtmlElementHandler<HTMLTableRowElement, TableRowHandler> {

	private readonly tableRow: HTMLTableRowElement;

	public constructor() {
		let tableRow: HTMLTableRowElement = document.createElement("tr");
		super(tableRow);

		this.tableRow = tableRow;
	}

	public addCell(node: Node, colSpan?: number): TableRowHandler {
		let dataCell: HTMLTableDataCellElement = document.createElement("td");
		dataCell.scope = "col";
		dataCell.appendChild(node);
		if (colSpan) {
			dataCell.colSpan = colSpan;
		}
		this.tableRow.appendChild(dataCell);

		return this;
	}

	protected getConcreteHandler(): TableRowHandler {
		return this;
	}

}
