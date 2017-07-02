import { View } from "../views/View";
import { ControllersRelations } from "./ControllersRelations";

export abstract class ViewController {

	private static readonly VIEW_PARAMETER_KEY = "view";

	protected view: View;

	private readonly controllersRelations: ControllersRelations;

	public constructor(controllersRelations: ControllersRelations) {
		this.controllersRelations = controllersRelations;
	}

	public abstract getViewParameterValue(): string;

	public abstract updateFromUrl(): string;

	public getQueryParams(additionalParameters?: any): string {
		return this.generateQueryParams(additionalParameters);
	}

	public showView(): void {
		this.view.show();
	}

	public hideView(): void {
		this.view.hide();
	}

	public isActiveView(): boolean {
		let parametersFromUrl: any = this.getParametersFromUrl();
		let viewParameterValueFromUrl: string = parametersFromUrl[ViewController.VIEW_PARAMETER_KEY];
		return viewParameterValueFromUrl === this.getViewParameterValue();
	}

	public getControllersRelations(): ControllersRelations {
		return this.controllersRelations;
	}

	protected getParametersFromUrl(): any {
		return (window as any).$.deparam(document.location.search.substring(1));
	}

	protected generateQueryParams(additionalParameters?: any): string {
		let parameters: any = {};
		parameters[ViewController.VIEW_PARAMETER_KEY] = this.getViewParameterValue();
		Object.assign(parameters, additionalParameters);
		return "?" + $.param(parameters);
	}

}
