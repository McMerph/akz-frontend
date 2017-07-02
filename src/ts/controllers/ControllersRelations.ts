import { EditingController } from "./EditingController";
import { JournalController } from "./JournalController";

export class ControllersRelations {

	private editingController: EditingController;
	private journalController: JournalController;

	public setSearchResponseNeedUpdate(searchResponseNeedUpdate: boolean): void {
		this.journalController.setSearchResponseNeedUpdate(searchResponseNeedUpdate);
	}

	public setEditingController(editingController: EditingController): void {
		this.editingController = editingController;
	}

	public setJounalController(journalController: JournalController): void {
		this.journalController = journalController;
	}

}

