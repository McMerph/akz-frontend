import { ResistanceMeasurement } from "../../../../domain/ResistanceMeasurement";
import { Rails } from "../../../../domain/Rails";
import { JointedTrackPart } from "../../../../domain/JointedTrackPart";
import { SearchRequest } from "../../../../domain/SearchRequest";
import { JointedTrackPartController } from "../../../../controllers/JointedTrackPartController";
import { Property } from "../../../properties/Property";
import { Icons } from "../../Icons";
import { InputType } from "../basic/InputHandler";
import { InputHandler } from "../basic/InputHandler";
import { DateTimePickerHandler } from "../basic/DateTimePickerHandler";
import { PropertyInputGroupHandler } from "../basic/PropertyInputGroupHandler";
import { ButtonHandler } from "../basic/ButtonHandler";
import { FormGroupHandler } from "../basic/form/FormGroupHandler";
import { FormHandler } from "../basic/form/FormHandler";
import { CollapsiblePanelHandler } from "../basic/panel/CollapsiblePanelHandler";
import { RailsOffsetSelectHandler } from "../RailsOffsetSelectHandler";
import { RutEntriesArrayTableHandler } from "../table/RutEntriesArrayTableHandler";
import { SleepersGapsArrayTableHandler } from "../table/SleepersGapsArrayTableHandler";

interface JointedTrackPartFormOptions {

	jointedTrackPartController: JointedTrackPartController;
	rutEntriesArrayTableId: string;
	sleepersGapsArrayTableId: string;
	rutEntriesArrayArrayPanelId: string;
	sleepersGapsArrayArrayPanelId: string;

}

export class JointedTrackPartFormHandler extends FormHandler {

	private static readonly RUT_ENTRIES_TEXT: string = "Ширина колеи";
	private static readonly SLEEPERS_GAPS_TEXT: string = "Расстояния между шпалами";

	private static readonly MMS_TEXT: string = "мм";
	private static readonly PERCENTAGE_TEXT: string = "%";
	private static readonly CELSIUS_TEXT: string = "°C";
	private static readonly OHMS_TEXT: string = "Ом";

	private static readonly DEFINITION_TEXT: string = "Обозначение";
	private static readonly CREATION_DATE_TEXT: string = "Дата и время";
	private static readonly FIRST_SLEEPER_DISTANCE_ON_LEFT_TEXT: string = "Расстояние от торца левого рельса до оси первой шпалы";
	private static readonly FIRST_SLEEPER_DISTANCE_ON_RIGHT_TEXT: string = "Расстояние от торца правого рельса до оси первой шпалы";
	private static readonly LAST_SLEEPER_DISTANCE_ON_LEFT_TEXT: string = "Расстояние от торца левого рельса до оси последней шпалы";
	private static readonly LAST_SLEEPER_DISTANCE_ON_RIGHT_TEXT: string = "Расстояние от торца правого рельса до оси последней шпалы";
	private static readonly BREAKED_RAIL_AT_START_TEXT: string = "Выступающий рельс в начале звена";
	private static readonly RAIL_START_OFFSET_TEXT: string = "Забег рельса в начале звена";
	private static readonly BREAKED_RAIL_AT_END_TEXT: string = "Выступающий рельс в конце звена";
	private static readonly RAIL_END_OFFSET_TEXT: string = "Забег рельса в конце звена";
	private static readonly HUMIDITY_TEXT: string = "Влажность";
	private static readonly TEMPERATURE_TEXT: string = "Температура";
	private static readonly RESISTANCE_TEXT: string = "Сопротивление";

	private firstSleeperDistanceOnLeft: Property;
	private lastSleeperDistanceOnLeft: Property;
	private firstSleeperDistanceOnRight: Property;
	private lastSleeperDistanceOnRight: Property;
	private railStartOffset: Property;
	private railEndOffset: Property;
	private humidity: Property;
	private temperature: Property;
	private resistance: Property;

	private definitionInputHandler: InputHandler;
	private creationDatePickerHandler: DateTimePickerHandler;
	private firstSleeperDistanceOnLeftInputGroupHandler: PropertyInputGroupHandler;
	private lastSleeperDistanceOnLeftInputGroupHandler: PropertyInputGroupHandler;
	private firstSleeperDistanceOnRightInputGroupHandler: PropertyInputGroupHandler;
	private lastSleeperDistanceOnRightInputGroupHandler: PropertyInputGroupHandler;
	private railsStartOffsetSelectHandler: RailsOffsetSelectHandler;
	private railStartOffsetInputGroupHandler: PropertyInputGroupHandler;
	private railsEndOffsetSelectHandler: RailsOffsetSelectHandler;
	private railEndOffsetInputGroupHandler: PropertyInputGroupHandler;
	private humidityInputGroupHandler: PropertyInputGroupHandler;
	private temperatureInputGroupHandler: PropertyInputGroupHandler;
	private resistanceInputGroupHandler: PropertyInputGroupHandler;
	private rutEntriesArrayTableHandler: RutEntriesArrayTableHandler;
	private sleepersGapsArrayTableHandler: SleepersGapsArrayTableHandler;

	private jointedTrackPartId: number;

	public constructor(options: JointedTrackPartFormOptions) {
		super();
		this.initializeProperties();
		this.initializeHandlers(options);
		this.initializeForm(options);
	}

	public update(jointedTrackPart: JointedTrackPart): void {
		let rails: Rails = jointedTrackPart.getRails();
		let resistanceMeasurement: ResistanceMeasurement = jointedTrackPart.getResistanceMeasurement();
		this.jointedTrackPartId = jointedTrackPart.getId();

		this.definitionInputHandler.setValue(jointedTrackPart.getDefinition());
		this.creationDatePickerHandler.setDate(jointedTrackPart.getCreationDate());
		this.firstSleeperDistanceOnLeftInputGroupHandler.setPropertyValue(rails.getFirstSleeperDistanceOnLeft());
		this.lastSleeperDistanceOnLeftInputGroupHandler.setPropertyValue(rails.getLastSleeperDistanceOnLeft());
		this.firstSleeperDistanceOnRightInputGroupHandler.setPropertyValue(rails.getFirstSleeperDistanceOnRight());
		this.lastSleeperDistanceOnRightInputGroupHandler.setPropertyValue(rails.getLastSleeperDistanceOnRight());
		this.railsStartOffsetSelectHandler.setOffsetSide(rails.getRightRailStartOffset());
		this.railStartOffsetInputGroupHandler.setPropertyValue(Math.abs(rails.getRightRailStartOffset()));
		this.railsEndOffsetSelectHandler.setOffsetSide(rails.getRightRailEndOffset());
		this.railEndOffsetInputGroupHandler.setPropertyValue(Math.abs(rails.getRightRailEndOffset()));
		this.humidityInputGroupHandler.setPropertyValue(resistanceMeasurement.getHumidity());
		this.temperatureInputGroupHandler.setPropertyValue(resistanceMeasurement.getTemperature());
		this.resistanceInputGroupHandler.setPropertyValue(resistanceMeasurement.getResistance());
		this.rutEntriesArrayTableHandler.fill(jointedTrackPart.getRut());
		this.sleepersGapsArrayTableHandler.fill(jointedTrackPart.getSleepersGaps());
	}

	public getJointedTrackPart(): JointedTrackPart {
		this.firstSleeperDistanceOnLeftInputGroupHandler.updatePropertyValue();
		this.lastSleeperDistanceOnLeftInputGroupHandler.updatePropertyValue();
		this.firstSleeperDistanceOnRightInputGroupHandler.updatePropertyValue();
		this.lastSleeperDistanceOnRightInputGroupHandler.updatePropertyValue();
		this.railStartOffsetInputGroupHandler.updatePropertyValue();
		this.railEndOffsetInputGroupHandler.updatePropertyValue();
		this.humidityInputGroupHandler.updatePropertyValue();
		this.temperatureInputGroupHandler.updatePropertyValue();
		this.resistanceInputGroupHandler.updatePropertyValue();

		let rightRailStartOffset: number = this.railsStartOffsetSelectHandler.getOffsetFactor() * this.railStartOffset.getValue();
		let rightRailEndOffset: number = this.railsEndOffsetSelectHandler.getOffsetFactor() * this.railEndOffset.getValue();

		let jointedTrackPart = new JointedTrackPart({
			id: this.jointedTrackPartId,
			definition: this.definitionInputHandler.getValue(),
			creationDate: this.creationDatePickerHandler.getDate(),
			rut: this.rutEntriesArrayTableHandler.getValues(),
			sleepersGaps: this.sleepersGapsArrayTableHandler.getValues(),
			rails: {
				rightRailStartOffset: rightRailStartOffset,
				rightRailEndOffset: rightRailEndOffset,
				firstSleeperDistanceOnLeft: this.firstSleeperDistanceOnLeft.getValue(),
				firstSleeperDistanceOnRight: this.firstSleeperDistanceOnRight.getValue(),
				lastSleeperDistanceOnLeft: this.lastSleeperDistanceOnLeft.getValue(),
				lastSleeperDistanceOnRight: this.lastSleeperDistanceOnRight.getValue()
			},
			resistanceMeasurement: {
				temperature: this.temperature.getValue(),
				humidity: this.humidity.getValue(),
				resistance: this.resistance.getValue(),
			}
		});

		return jointedTrackPart;
	}

	protected getConcreteHandler(): JointedTrackPartFormHandler {
		return this;
	}

	private initializeProperties(): void {
		this.firstSleeperDistanceOnLeft = new Property({
			key: JointedTrackPartFormHandler.FIRST_SLEEPER_DISTANCE_ON_LEFT_TEXT,
			valueUnit: JointedTrackPartFormHandler.MMS_TEXT
		});
		this.lastSleeperDistanceOnLeft = new Property({
			key: JointedTrackPartFormHandler.FIRST_SLEEPER_DISTANCE_ON_RIGHT_TEXT,
			valueUnit: JointedTrackPartFormHandler.MMS_TEXT
		});
		this.firstSleeperDistanceOnRight = new Property({
			key: JointedTrackPartFormHandler.LAST_SLEEPER_DISTANCE_ON_LEFT_TEXT,
			valueUnit: JointedTrackPartFormHandler.MMS_TEXT
		});
		this.lastSleeperDistanceOnRight = new Property({
			key: JointedTrackPartFormHandler.LAST_SLEEPER_DISTANCE_ON_RIGHT_TEXT,
			valueUnit: JointedTrackPartFormHandler.MMS_TEXT
		});
		this.railStartOffset = new Property({
			key: JointedTrackPartFormHandler.RAIL_START_OFFSET_TEXT,
			valueUnit: JointedTrackPartFormHandler.MMS_TEXT
		});
		this.railEndOffset = new Property({
			key: JointedTrackPartFormHandler.RAIL_END_OFFSET_TEXT,
			valueUnit: JointedTrackPartFormHandler.MMS_TEXT
		});
		this.humidity = new Property({
			key: JointedTrackPartFormHandler.HUMIDITY_TEXT,
			valueUnit: JointedTrackPartFormHandler.PERCENTAGE_TEXT
		});
		this.temperature = new Property({
			key: JointedTrackPartFormHandler.TEMPERATURE_TEXT,
			valueUnit: JointedTrackPartFormHandler.CELSIUS_TEXT
		});
		this.resistance = new Property({
			key: JointedTrackPartFormHandler.RESISTANCE_TEXT,
			valueUnit: JointedTrackPartFormHandler.OHMS_TEXT
		});
	}

	private initializeHandlers(options: JointedTrackPartFormOptions): void {
		this.definitionInputHandler = new InputHandler(InputType.text)
			.addFormControlStyle()
			.setPlaceholder(JointedTrackPartFormHandler.DEFINITION_TEXT);
		this.creationDatePickerHandler = new DateTimePickerHandler();
		this.creationDatePickerHandler.setDate((window as any).moment().format(SearchRequest.DATE_TIME_FORMAT));
		this.firstSleeperDistanceOnLeftInputGroupHandler = new PropertyInputGroupHandler(this.firstSleeperDistanceOnLeft);
		this.firstSleeperDistanceOnLeftInputGroupHandler.addFormControlStyleToInput();
		this.lastSleeperDistanceOnLeftInputGroupHandler = new PropertyInputGroupHandler(this.lastSleeperDistanceOnLeft);
		this.lastSleeperDistanceOnLeftInputGroupHandler.addFormControlStyleToInput();
		this.firstSleeperDistanceOnRightInputGroupHandler = new PropertyInputGroupHandler(this.firstSleeperDistanceOnRight);
		this.firstSleeperDistanceOnRightInputGroupHandler.addFormControlStyleToInput();
		this.lastSleeperDistanceOnRightInputGroupHandler = new PropertyInputGroupHandler(this.lastSleeperDistanceOnRight);
		this.lastSleeperDistanceOnRightInputGroupHandler.addFormControlStyleToInput();
		this.railsStartOffsetSelectHandler = new RailsOffsetSelectHandler();
		this.railsStartOffsetSelectHandler.addFormControlStyle();
		this.railStartOffsetInputGroupHandler = new PropertyInputGroupHandler(this.railStartOffset);
		this.railStartOffsetInputGroupHandler.addFormControlStyleToInput();
		this.railsEndOffsetSelectHandler = new RailsOffsetSelectHandler();
		this.railsEndOffsetSelectHandler.addFormControlStyle();
		this.railEndOffsetInputGroupHandler = new PropertyInputGroupHandler(this.railEndOffset);
		this.railEndOffsetInputGroupHandler.addFormControlStyleToInput();
		this.humidityInputGroupHandler = new PropertyInputGroupHandler(this.humidity);
		this.humidityInputGroupHandler.addFormControlStyleToInput();
		this.temperatureInputGroupHandler = new PropertyInputGroupHandler(this.temperature);
		this.temperatureInputGroupHandler.addFormControlStyleToInput();
		this.resistanceInputGroupHandler = new PropertyInputGroupHandler(this.resistance);
		this.resistanceInputGroupHandler.addFormControlStyleToInput();
		this.rutEntriesArrayTableHandler = new RutEntriesArrayTableHandler();
		this.rutEntriesArrayTableHandler.setId(options.rutEntriesArrayTableId);
		this.sleepersGapsArrayTableHandler = new SleepersGapsArrayTableHandler();
		this.sleepersGapsArrayTableHandler.setId(options.sleepersGapsArrayTableId);
	}

	private initializeForm(options: JointedTrackPartFormOptions): void {
		this
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.DEFINITION_TEXT)
				.embed(this.definitionInputHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.CREATION_DATE_TEXT)
				.addRelativePositionNode(this.creationDatePickerHandler.getHtmlElement()))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.FIRST_SLEEPER_DISTANCE_ON_LEFT_TEXT)
				.embed(this.firstSleeperDistanceOnLeftInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.FIRST_SLEEPER_DISTANCE_ON_RIGHT_TEXT)
				.embed(this.lastSleeperDistanceOnLeftInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.LAST_SLEEPER_DISTANCE_ON_LEFT_TEXT)
				.embed(this.firstSleeperDistanceOnRightInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.LAST_SLEEPER_DISTANCE_ON_RIGHT_TEXT)
				.embed(this.lastSleeperDistanceOnRightInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.BREAKED_RAIL_AT_START_TEXT)
				.embed(this.railsStartOffsetSelectHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.RAIL_START_OFFSET_TEXT)
				.embed(this.railStartOffsetInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.BREAKED_RAIL_AT_END_TEXT)
				.embed(this.railsEndOffsetSelectHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.RAIL_END_OFFSET_TEXT)
				.embed(this.railEndOffsetInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.HUMIDITY_TEXT)
				.embed(this.humidityInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.TEMPERATURE_TEXT)
				.embed(this.temperatureInputGroupHandler))
			.embed(new FormGroupHandler()
				.addLabel(JointedTrackPartFormHandler.RESISTANCE_TEXT)
				.embed(this.resistanceInputGroupHandler))
			.embed(new FormGroupHandler()
				.embed(new CollapsiblePanelHandler(options.rutEntriesArrayArrayPanelId)
					.addChildNodesToAnchor(document.createTextNode(JointedTrackPartFormHandler.RUT_ENTRIES_TEXT))
					.addChildNodesToBody(this.rutEntriesArrayTableHandler.getHtmlElement())
					.addDefaultPanelStyle()))
			.embed(new FormGroupHandler()
				.embed(new CollapsiblePanelHandler(options.sleepersGapsArrayArrayPanelId)
					.addChildNodesToAnchor(document.createTextNode(JointedTrackPartFormHandler.SLEEPERS_GAPS_TEXT))
					.addChildNodesToBody(this.sleepersGapsArrayTableHandler.getHtmlElement())
					.addDefaultPanelStyle()))
			.embed(new ButtonHandler()
				.setSubmitType()
				.addPrimaryStyle()
				.addBlockStyle()
				.addClonedNodes(Icons.OK)
				.addText(" Записать"));

		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			let jointedTrackPart: JointedTrackPart = this.getJointedTrackPart();
			options.jointedTrackPartController.submit(jointedTrackPart);
		});
	}

}
