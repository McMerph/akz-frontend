import { JointedTrackPartPassport } from "../../../../domain/JointedTrackPartPassport";
import { JointedTrackPart } from "../../../../domain/JointedTrackPart";
import { ResistanceMeasurement } from "../../../../domain/ResistanceMeasurement";
import { Property } from "../../../properties/Property";
import { TableProperty } from "../../../properties/TableProperty";
import { PropertiesTableHandler } from "../basic/table/PropertiesTableHandler";

export class ResistanceMeasurementPropertiesTableHandler extends PropertiesTableHandler {

	private static readonly ID: string = "resistance-measurement-control-table";
	private static readonly HEAD_TEXT: string = "Контроль сопротивления";
	private static readonly RESISTANCE_TEXT: string = "Сопротивление";
	private static readonly TEMPERATURE_TEXT: string = "Температура";
	private static readonly HUMIDITY_TEXT: string = "Относительная влажность";

	private static readonly OHMS_TEXT: string = "Ом";
	private static readonly CELSIUS_TEXT: string = "°C";
	private static readonly PERCENTAGE_TEXT: string = "%";

	public constructor() {
		super();
		this.addHead(3, ResistanceMeasurementPropertiesTableHandler.HEAD_TEXT)
			.setId(ResistanceMeasurementPropertiesTableHandler.ID);
	}

	public update(jointedTrackPartPassport: JointedTrackPartPassport): void {
		let jointedTrackPart: JointedTrackPart = jointedTrackPartPassport.getJointedTrackPart();
		let resistanceMeasurement: ResistanceMeasurement = jointedTrackPart.getResistanceMeasurement();

		let resistance: number = resistanceMeasurement.getResistance();
		let temperature: number = resistanceMeasurement.getTemperature();
		let humidity: number = resistanceMeasurement.getHumidity();
		let validResistance: boolean = jointedTrackPartPassport.isValidResistance();

		this.updateBody(
			new TableProperty(
				new Property({
					key: ResistanceMeasurementPropertiesTableHandler.RESISTANCE_TEXT,
					value: resistance,
					valueUnit: ResistanceMeasurementPropertiesTableHandler.OHMS_TEXT,
					valid: validResistance
				})),
			new TableProperty(
				new Property({
					key: ResistanceMeasurementPropertiesTableHandler.TEMPERATURE_TEXT,
					value: temperature,
					valueUnit: ResistanceMeasurementPropertiesTableHandler.CELSIUS_TEXT
				}), 2),
			new TableProperty(
				new Property({
					key: ResistanceMeasurementPropertiesTableHandler.HUMIDITY_TEXT,
					value: humidity,
					valueUnit: ResistanceMeasurementPropertiesTableHandler.PERCENTAGE_TEXT
				}), 2)
		);
	}

	protected getConcreteHandler(): ResistanceMeasurementPropertiesTableHandler {
		return this;
	}

}
