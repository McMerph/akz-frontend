import { JointedTrackPartPassport } from "../domain/JointedTrackPartPassport";
import { PassportModel } from "../models/PassportModel";
import { PassportView } from "../views/PassportView";
import { ViewController } from "./ViewController";
import { ControllersRelations } from "./ControllersRelations";

export class PassportController extends ViewController {

	private static readonly ID_PARAMETER_KEY = "id";
	private static readonly VIEW_PARAMETER_VALUE = "passport";

	private passportModel: PassportModel;
	private passportView: PassportView;

	public constructor(controllersRelations: ControllersRelations, passportModel: PassportModel) {
		super(controllersRelations);
		this.passportModel = passportModel;
		this.passportView = new PassportView(this, this.passportModel);
		this.view = this.passportView;

		this.passportView.setLoadState();
	}

	// ViewController
	public getQueryParams(id: number): string {
		return super.getQueryParams({
			[PassportController.ID_PARAMETER_KEY]: id
		});
	}

	// ViewController
	public getViewParameterValue(): string {
		return PassportController.VIEW_PARAMETER_VALUE;
	}

	// ViewController
	public updateFromUrl(): string {
		let parameters: any = this.getParametersFromUrl();
		let id: number = parseInt(parameters[PassportController.ID_PARAMETER_KEY]);
		let normalizedQueryParamsFromUrl: string = this.getQueryParams(id);
		this.retrievePassport(id);

		return normalizedQueryParamsFromUrl;
	}

	public retrievePassport(id: number): void {
		this.passportView.setLoadState();
		this.passportModel.retrievePassport(id);
	}

}
