import { RutEntries } from "../../../properties/RutEntries";
import { EditablePropertiesArrayTableHandler } from "../basic/table/EditablePropertiesArrayTableHandler";

export class RutEntriesArrayTableHandler extends EditablePropertiesArrayTableHandler {

	public constructor() {
		super({
			propertiesArray: new RutEntries(),
			modalHeaderText: "Редактирование ширины колеи",
			addButtonText: "Добавить позицию колеи"
		});
	}

}