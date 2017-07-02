import { SleepersGaps } from "../../../properties/SleepersGaps";
import { EditablePropertiesArrayTableHandler } from "../basic/table/EditablePropertiesArrayTableHandler";

export class SleepersGapsArrayTableHandler extends EditablePropertiesArrayTableHandler {

	public constructor() {
		super({
			propertiesArray: new SleepersGaps(),
			modalHeaderText: "Редактирование расстояния между шпалами",
			addButtonText: "Добавить шпалу"
		});
	}

}