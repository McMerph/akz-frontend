import { JointedTrackPart } from "../domain/JointedTrackPart";
import { CreationModel } from "../models/CreationModel";
import { CreationView } from "../views/CreationView";
import { ViewController } from "./ViewController";
import { JointedTrackPartController } from "./JointedTrackPartController";
import { ControllersRelations } from "./ControllersRelations";

export class CreationController extends ViewController implements JointedTrackPartController {

	private static readonly VIEW_PARAMETER_VALUE = "creation";

	private creationModel: CreationModel;
	private creationView: CreationView;

	public constructor(controllersRelations: ControllersRelations, creationModel: CreationModel) {
		super(controllersRelations);
		this.creationModel = creationModel;
		this.creationView = new CreationView(this, this.creationModel);
		this.view = this.creationView;

		this.creationView.setLoadState();
	}

	// ViewController
	public getViewParameterValue(): string {
		return CreationController.VIEW_PARAMETER_VALUE;
	}

	// ViewController
	public updateFromUrl(): string {
		let parameters: any = this.getParametersFromUrl();
		let normalizedQueryParamsFromUrl: string = this.getQueryParams();
		this.init();

		return normalizedQueryParamsFromUrl;
	}

	// JointedTrackPartController
	public submit(jointedTrackPart: JointedTrackPart): void {
		this.createJointedTrackPart(jointedTrackPart);
		this.getControllersRelations().setSearchResponseNeedUpdate(true);
	}

	public createJointedTrackPart(jointedTrackPart: JointedTrackPart): void {
		this.creationView.setLoadState();
		this.creationModel.createJointedTrackPart(jointedTrackPart);
	}

	public init(): void {
		this.creationView.setCreateState();
	}

}
