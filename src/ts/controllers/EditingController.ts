import { JointedTrackPart } from "../domain/JointedTrackPart";
import { EditingModel } from "../models/EditingModel";
import { EditingView } from "../views/EditingView";
import { ViewController } from "./ViewController";
import { JointedTrackPartController } from "./JointedTrackPartController";
import { ControllersRelations } from "./ControllersRelations";

export class EditingController extends ViewController implements JointedTrackPartController {

	private static readonly ID_PARAMETER_KEY = "id";
	private static readonly VIEW_PARAMETER_VALUE = "editing";

	private editingModel: EditingModel;
	private editingView: EditingView;

	public constructor(controllersRelations: ControllersRelations, editingModel: EditingModel) {
		super(controllersRelations);
		this.editingModel = editingModel;
		this.editingView = new EditingView(this, this.editingModel);
		this.view = this.editingView;

		this.editingView.setLoadState();
	}

	// ViewController
	public getQueryParams(id: number): string {
		return super.getQueryParams({
			[EditingController.ID_PARAMETER_KEY]: id
		});
	}

	// ViewController
	public getViewParameterValue(): string {
		return EditingController.VIEW_PARAMETER_VALUE;
	}

	// ViewController
	public updateFromUrl(): string {
		let parameters: any = this.getParametersFromUrl();
		let id: number = parseInt(parameters[EditingController.ID_PARAMETER_KEY]);
		let normalizedQueryParamsFromUrl: string = this.getQueryParams(id);
		this.retrieveJointedTrackPartById(id);

		return normalizedQueryParamsFromUrl;
	}

	// JointedTrackPartController
	public submit(jointedTrackPart: JointedTrackPart): void {
		this.updateJointedTrackPart(jointedTrackPart);
		this.getControllersRelations().setSearchResponseNeedUpdate(true);
	}

	public retrieveJointedTrackPartById(id: number): void {
		this.editingView.setLoadState();
		this.editingModel.retrieveJointedTrackPartById(id);
	}

	public updateJointedTrackPart(jointedTrackPart: JointedTrackPart): void {
		this.editingView.setLoadState();
		this.editingModel.updateJointedTrackPart(jointedTrackPart);
	}

}
