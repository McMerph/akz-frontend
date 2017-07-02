import { JointedTrackPartCompactRepresentation } from "../domain/JointedTrackPartCompactRepresentation";
import { SearchRequest } from "../domain/SearchRequest";
import { JournalModel } from "../models/JournalModel";
import { JournalView } from "../views/JournalView";
import { ViewController } from "./ViewController";
import { ControllersRelations } from "./ControllersRelations";

export class JournalController extends ViewController {

	private static readonly VIEW_PARAMETER_VALUE = "journal";

	private readonly journalModel: JournalModel;
	private readonly journalView: JournalView;

	private searchResponseNeedUpdate: boolean = true;

	public constructor(controllersRelations: ControllersRelations, journalModel: JournalModel) {
		super(controllersRelations);
		this.journalModel = journalModel;
		this.journalView = new JournalView(this, this.journalModel);
		this.view = this.journalView;

		this.journalView.setLoadState();
	}

	// ViewController
	public getViewParameterValue(): string {
		return JournalController.VIEW_PARAMETER_VALUE;
	}

	// ViewController
	public updateFromUrl(): string {
		let parameters: any = this.getParametersFromUrl();
		let normalizedQueryParamsFromUrl: string = this.getQueryParams();
		this.update();

		return normalizedQueryParamsFromUrl;
	}

	public update(): void {
		if (this.searchResponseNeedUpdate) {
			this.journalView.setLoadState();
			this.journalModel.updateSearchResponse();
			this.searchResponseNeedUpdate = false;
		}
	}

	public deleteJointedTrackPart(id: number): void {
		this.journalView.setLoadState();
		this.journalModel.deleteJointedTrackPart(id);
	}

	public handleSearchRequestReset(): void {
		this.journalView.setLoadState();
		this.journalView.collapseSearchRequestPanel();
		this.journalModel.resetSearchRequest();
		this.journalModel.updateSearchResponse();
	}

	public handleSearchRequestSubmit(searchRequest: SearchRequest): void {
		this.journalView.setLoadState();
		this.journalView.collapseSearchRequestPanel();
		this.journalModel.setSearchRequest(searchRequest);
		this.journalModel.updateSearchResponse();
	}

	public previous() {
		if (this.journalModel.previous()) {
			this.journalView.setLoadState();
		}
	}

	public next() {
		if (this.journalModel.next()) {
			this.journalView.setLoadState();
		}
	}

	public getJointedTrackPartPassportResourceUrl(jointedTrackPartCompactRepresentation: JointedTrackPartCompactRepresentation): string {
		return this.journalModel.getJointedTrackPartPassportResourceUrl(jointedTrackPartCompactRepresentation);
	}

	public setSearchResponseNeedUpdate(searchResponseNeedUpdate: boolean) {
		this.searchResponseNeedUpdate = searchResponseNeedUpdate;
	}

}
