import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiResponseEvent } from "../rest-api/RestApiResponseEvent";
import { RestApiError } from "../rest-api/RestApiError";
import { RestApiErrorEvent } from "../rest-api/RestApiErrorEvent";
import { RestApiResponseObserver } from "../rest-api/RestApiResponseObserver";
import { RestApiErrorObserver } from "../rest-api/RestApiErrorObserver";
import { HeadingType } from "./html-elements/handlers/basic/HeadingHandler";
import { HeadingHandler } from "./html-elements/handlers/basic/HeadingHandler";
import { View } from "./View";

export abstract class RestApiView extends View implements RestApiResponseObserver, RestApiErrorObserver {

	protected static readonly LOAD_TEXT = "Пожалуйста, подождите...";

	// RestApiResponseObserver
	public abstract onResponse(response: RestApiResponse): void;

	// RestApiErrorObserver
	public abstract onError(error: RestApiError): void;

	private loadHeadingHandler: HeadingHandler;
	private restApiErrorHandler: HeadingHandler;

	public constructor() {
		super();
		this.loadHeadingHandler = new HeadingHandler(HeadingType.h4)
			.setTextCenter()
			.setInfoStyle()
			.setText(RestApiView.LOAD_TEXT);
		this.restApiErrorHandler = new HeadingHandler(HeadingType.h4)
			.setTextCenter()
			.setWarningStyle();
	}

	protected showLoadHeadingHandler(): void {
		this.loadHeadingHandler.show();
	}

	protected hideLoadHeadingHandler(): void {
		this.loadHeadingHandler.hide();
	}

	protected showRestApiErrorHandler(): void {
		this.restApiErrorHandler.show();
	}

	protected hideRestApiErrorHandler(): void {
		this.restApiErrorHandler.hide();
	}

	protected setRestApiErrorHandlerText(text: string): void {
		this.restApiErrorHandler.setText(text);
	}

	protected getLoadHeadingHandler(): HeadingHandler {
		return this.loadHeadingHandler;
	}

	protected getRestApiErrorHandler(): HeadingHandler {
		return this.restApiErrorHandler;
	}

}