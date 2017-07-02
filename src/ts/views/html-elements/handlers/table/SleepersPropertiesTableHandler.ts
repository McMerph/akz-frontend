import { JointedTrackPartPassport } from "../../../../domain/JointedTrackPartPassport";
import { JointedTrackPart } from "../../../../domain/JointedTrackPart";
import { TableProperty } from "../../../properties/TableProperty";
import { Property } from "../../../properties/Property";
import { PropertiesTableHandler } from "../basic/table/PropertiesTableHandler";

export class SleepersPropertiesTableHandler extends PropertiesTableHandler {

	private static readonly ID: string = "sleepers-gaps-control-table";
	private static readonly HEAD_TEXT: string = "Контроль шпал";
	private static readonly SLEEPERS_GAPS_COUNT_TEXT: string = "Количество шпальных ящиков";
	private static readonly MINIMUM_SLEEPERS_GAP_TEXT: string = "Минимальное расстояние между шпалами";
	private static readonly MAXIMUM_SLEEPERS_GAP_TEXT: string = "Максимальное расстояние между шпалами";
	private static readonly MMS_TEXT: string = "мм";

	public constructor() {
		super();
		this.addHead(3, SleepersPropertiesTableHandler.HEAD_TEXT)
			.setId(SleepersPropertiesTableHandler.ID);
	}

	public update(jointedTrackPartPassport: JointedTrackPartPassport): void {
		let jointedTrackPart: JointedTrackPart = jointedTrackPartPassport.getJointedTrackPart();
		let sleepersGaps: number[] = jointedTrackPart.getSleepersGaps();

		let minimumSleepersGap: number = Math.min(...sleepersGaps);
		let maximumSleepersGap: number = Math.max(...sleepersGaps);
		let sleepersGapsAmount: number = sleepersGaps.length;

		this.updateBody(
			new TableProperty(new Property({
				key: SleepersPropertiesTableHandler.SLEEPERS_GAPS_COUNT_TEXT,
				value: sleepersGapsAmount
			})),
			new TableProperty(new Property({
				key: SleepersPropertiesTableHandler.MINIMUM_SLEEPERS_GAP_TEXT,
				value: minimumSleepersGap,
				valueUnit: SleepersPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new Property({
				key: SleepersPropertiesTableHandler.MAXIMUM_SLEEPERS_GAP_TEXT,
				value: maximumSleepersGap,
				valueUnit: SleepersPropertiesTableHandler.MMS_TEXT
			})));
	}

	protected getConcreteHandler(): SleepersPropertiesTableHandler {
		return this;
	}

}
