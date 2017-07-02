import { RestApi } from "../rest-api/RestApi";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiError } from "../rest-api/RestApiError";
import { RestApiResponseObserver } from "../rest-api/RestApiResponseObserver";
import { RestApiErrorObserver } from "../rest-api/RestApiErrorObserver";

export abstract class ViewModel {

	private readonly restApi: RestApi;

	private restApiResponseObservers: RestApiResponseObserver[] = [];
	private restApiErrorObservers: RestApiErrorObserver[] = [];

	public constructor(restApi: RestApi) {
		this.restApi = restApi;
	}

	public registerRestApiResponseObserver(observer: RestApiResponseObserver): void {
		this.restApiResponseObservers.push(observer);
	}

	public removeRestApiResponseObserver(observer: RestApiResponseObserver): void {
		let index: number = this.restApiResponseObservers.indexOf(observer);
		this.restApiResponseObservers.splice(index, 1);
	}

	public registerRestApiErrorObserver(observer: RestApiErrorObserver): void {
		this.restApiErrorObservers.push(observer);
	}

	public removeRestApiErrorObserver(observer: RestApiErrorObserver): void {
		let index: number = this.restApiErrorObservers.indexOf(observer);
		this.restApiErrorObservers.splice(index, 1);
	}

	public getRestApi(): RestApi {
		return this.restApi;
	}

	protected notifyRestApiResponseObservers(response: RestApiResponse): void {
		this.restApiResponseObservers.forEach((observer) => observer.onResponse(response));
	}

	protected notifyRestApiErrorObservers(error: RestApiError): void {
		this.restApiErrorObservers.forEach((observer) => observer.onError(error));
	}

}
