import { JointedTrackPartPassport } from "../../../../domain/JointedTrackPartPassport";
import { RutEntries } from "../../../properties/RutEntries";
import { TableProperty } from "../../../properties/TableProperty";
import { PropertiesTableHandler } from "../basic/table/PropertiesTableHandler";

export class RutEntriesTableHandler extends PropertiesTableHandler {

	private static readonly ID: string = "rut-entries-table";

	public constructor() {
		super();
		this.setId(RutEntriesTableHandler.ID);
	}

	public update(jointedTrackPartPassport: JointedTrackPartPassport): void {
		let rutEntries: RutEntries = new RutEntries();
		rutEntries.update(jointedTrackPartPassport.getRut());
		let tableProperties: TableProperty[] = rutEntries.getProperties().map((property) =>
			new TableProperty(property));
		this.updateBody(...tableProperties);
	}

	protected getConcreteHandler(): RutEntriesTableHandler {
		return this;
	}

}
