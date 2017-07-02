import { JointedTrackPartPassport } from "../../../../domain/JointedTrackPartPassport";
import { JointedTrackPart } from "../../../../domain/JointedTrackPart";
import { Property } from "../../../properties/Property";
import { TableProperty } from "../../../properties/TableProperty";
import { PropertiesTableHandler } from "../basic/table/PropertiesTableHandler";

export class RutPropertiesTableHandler extends PropertiesTableHandler {

	private static readonly ID: string = "rut-control-table";
	private static readonly HEAD_TEXT: string = "Контроль колеи";
	private static readonly RUT_RECORDS_COUNT_TEXT: string = "Количество записей";
	private static readonly MINIMUM_RUT_WIDTH_TEXT: string = "Минимальная ширина колеи";
	private static readonly MAXIMUM_RUT_WIDTH_TEXT: string = "Максимальная ширина колеи";
	private static readonly MMS_TEXT: string = "мм";

	public constructor() {
		super();
		this.addHead(3, RutPropertiesTableHandler.HEAD_TEXT)
			.setId(RutPropertiesTableHandler.ID);
	}

	public update(jointedTrackPartPassport: JointedTrackPartPassport): void {
		let jointedTrackPart: JointedTrackPart = jointedTrackPartPassport.getJointedTrackPart();
		let rut: number[] = jointedTrackPart.getRut();
		let minimumRutWidth: number = Math.min(...rut);
		let maximumRutWidth: number = Math.max(...rut);
		let rutEntriesAmount: number = rut.length;

		this.updateBody(
			new TableProperty(new Property({
				key: RutPropertiesTableHandler.RUT_RECORDS_COUNT_TEXT,
				value: rutEntriesAmount
			})),
			new TableProperty(new Property({
				key: RutPropertiesTableHandler.MINIMUM_RUT_WIDTH_TEXT,
				value: minimumRutWidth,
				valueUnit: RutPropertiesTableHandler.MMS_TEXT
			})),
			new TableProperty(new Property({
				key: RutPropertiesTableHandler.MAXIMUM_RUT_WIDTH_TEXT,
				value: maximumRutWidth,
				valueUnit: RutPropertiesTableHandler.MMS_TEXT
			})));
	}

	protected getConcreteHandler(): RutPropertiesTableHandler {
		return this;
	}

}
