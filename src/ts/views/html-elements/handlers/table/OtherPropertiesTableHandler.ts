import { JointedTrackPartPassport } from "../../../../domain/JointedTrackPartPassport";
import { JointedTrackPart } from "../../../../domain/JointedTrackPart";
import { ResistanceMeasurement } from "../../../../domain/ResistanceMeasurement";
import { Rails } from "../../../../domain/Rails";
import { TableProperty } from "../../../properties/TableProperty";
import { Property } from "../../../properties/Property";
import { RailsOffsetProperty } from "../../../properties/RailsOffsetProperty";
import { PropertiesTableHandler } from "../basic/table/PropertiesTableHandler";

export class OtherPropertiesTableHandler extends PropertiesTableHandler {

	private static readonly ID: string = "other-properties-table";
	private static readonly HEAD_TEXT: string = "Другие параметры";
	public static readonly AVERAGE_RUT_WIDTH: string = "Средняя ширина колеи";
	public static readonly AVERAGE_SLEEPERS_GAP: string = "Среднее расстояние между шпалами";
	public static readonly RIGHT_RAIL_START_OFFSET: string = "Забег рельса в начале звена";
	public static readonly RIGHT_RAIL_END_OFFSET: string = "Забег рельса в конце звена";
	public static readonly FIRST_SLEEPER_DISTANCE_ON_LEFT: string = "Расстояние от торца левого рельса до оси первой шпалы";
	public static readonly FIRST_SLEEPER_DISTANCE_ON_RIGHT: string = "Расстояние от торца правого рельса до оси первой шпалы";
	public static readonly LAST_SLEEPER_DISTANCE_ON_LEFT: string = "Расстояние от торца левого рельса до оси последней шпалы";
	public static readonly LAST_SLEEPER_DISTANCE_ON_RIGHT: string = "Расстояние от торца правого рельса до оси последней шпалы";

	private static readonly MMS_TEXT: string = "мм";

	public constructor() {
		super();
		this.addHead(3, OtherPropertiesTableHandler.HEAD_TEXT)
			.setId(OtherPropertiesTableHandler.ID);
	}

	public update(jointedTrackPartPassport: JointedTrackPartPassport): void {
		let jointedTrackPart: JointedTrackPart = jointedTrackPartPassport.getJointedTrackPart();
		let rails: Rails = jointedTrackPart.getRails();
		let rut: number[] = jointedTrackPart.getRut();
		let sleepersGaps: number[] = jointedTrackPart.getSleepersGaps();

		let averageRutWidth: number = rut.reduce((a, b) => a + b) / rut.length;
		let averageSleepersGap: number = sleepersGaps.reduce((a, b) => a + b) / sleepersGaps.length;
		let rightRailStartOffset: number = rails.getRightRailStartOffset();
		let rightRailEndOffset: number = rails.getRightRailEndOffset();
		let firstSleeperDistanceOnLeft: number = rails.getFirstSleeperDistanceOnLeft();
		let firstSleeperDistanceOnRight: number = rails.getFirstSleeperDistanceOnRight();
		let lastSleeperDistanceOnLeft: number = rails.getLastSleeperDistanceOnLeft();
		let lastSleeperDistanceOnRight: number = rails.getLastSleeperDistanceOnRight();

		this.updateBody(
			new TableProperty(new Property({
				key: OtherPropertiesTableHandler.AVERAGE_RUT_WIDTH,
				value: averageRutWidth,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new Property({
				key: OtherPropertiesTableHandler.AVERAGE_SLEEPERS_GAP,
				value: averageSleepersGap,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new RailsOffsetProperty({
				key: OtherPropertiesTableHandler.RIGHT_RAIL_START_OFFSET,
				value: rightRailStartOffset,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new RailsOffsetProperty({
				key: OtherPropertiesTableHandler.RIGHT_RAIL_END_OFFSET,
				value: rightRailEndOffset,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new Property({
				key: OtherPropertiesTableHandler.FIRST_SLEEPER_DISTANCE_ON_LEFT,
				value: firstSleeperDistanceOnLeft,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new Property({
				key: OtherPropertiesTableHandler.FIRST_SLEEPER_DISTANCE_ON_RIGHT,
				value: firstSleeperDistanceOnRight,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new Property({
				key: OtherPropertiesTableHandler.LAST_SLEEPER_DISTANCE_ON_LEFT,
				value: lastSleeperDistanceOnLeft,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new Property({
				key: OtherPropertiesTableHandler.LAST_SLEEPER_DISTANCE_ON_RIGHT,
				value: lastSleeperDistanceOnRight,
				valueUnit: OtherPropertiesTableHandler.MMS_TEXT
			})));
	}

	protected getConcreteHandler(): OtherPropertiesTableHandler {
		return this;
	}

}
