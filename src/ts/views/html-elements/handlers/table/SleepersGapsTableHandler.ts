import { JointedTrackPartPassport } from "../../../../domain/JointedTrackPartPassport";
import { SleepersGaps } from "../../../properties/SleepersGaps";
import { TableProperty } from "../../../properties/TableProperty";
import { PropertiesTableHandler } from "../basic/table/PropertiesTableHandler";

export class SleepersGapsTableHandler extends PropertiesTableHandler {

	private static readonly ID: string = "sleepers-gaps-table";

	public constructor() {
		super();
		this.setId(SleepersGapsTableHandler.ID);
	}

	public update(jointedTrackPartPassport: JointedTrackPartPassport): void {
		let sleepersGaps: SleepersGaps = new SleepersGaps();
		sleepersGaps.update(jointedTrackPartPassport.getSleepersGaps());
		let tableProperties: TableProperty[] = sleepersGaps.getProperties().map((property) =>
			new TableProperty(property));
		this.updateBody(...tableProperties);
	}

	protected getConcreteHandler(): SleepersGapsTableHandler {
		return this;
	}

}
