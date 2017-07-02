import { TableProperty } from "../../../../properties/TableProperty";
import { Icons } from "../../../Icons";
import { TableRowHandler } from "./TableRowHandler";
import { TableHandler } from "./TableHandler";

export abstract class PropertiesTableHandler extends TableHandler {

	public constructor() {
		super();
	}

	public updateBody(...tableProperties: TableProperty[]): PropertiesTableHandler {
		this.clearBody();

		for (let property of tableProperties) {
			let row: TableRowHandler = new TableRowHandler()
				.addCell(document.createTextNode(property.getKey()));
			row.addCell(document.createTextNode(property.getValueWithUnits()), property.getColSpan());

			if (property.isValid() === true) {
				row.addCell(Icons.OK.cloneNode(true));
			} else if (property.isValid() === false) {
				row.addCell(Icons.TIMES.cloneNode(true));
			}

			this.addRow(row);
		}

		return this;
	}

}
