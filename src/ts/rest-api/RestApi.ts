import { RestApiEntity } from "./RestApiEntity";
import { JointedTrackPart } from "../domain/JointedTrackPart";
import { JointedTrackPartPassport } from "../domain/JointedTrackPartPassport";
import { SearchRequest } from "../domain/SearchRequest";
import { SearchResponse } from "../domain/SearchResponse";
import { RestApiResponseEvent } from "./RestApiResponseEvent";
import { RestApiResponse } from "./RestApiResponse";
import { RestApiErrorEvent } from "./RestApiErrorEvent";
import { RestApiError } from "./RestApiError";

interface XmlHttpRequestPromiseOptions {

    method: string;
    url: string;
    data?: string,
    headers?: {
        name: string,
        value: string
    }[];
    successStatus: number;
    successEvent: RestApiResponseEvent;
    getEntity: (responseText: string) => RestApiEntity;

}

export class RestApi {

    private static readonly PORT: number = 48702;
    private static readonly TIMEOUT: number = 3000;
    private static readonly ROOT_PATH: string = "/akz-webapi";
    private static readonly JOINTED_TRACK_PARTS_PATH: string = "/jointed-track-parts";
    private static readonly PASSPORT_PATH: string = "/passport";

    private static readonly HTTP_STATUS_OK: number = 200;
    private static readonly HTTP_STATUS_CREATED: number = 201;
    private static readonly HTTP_STATUS_BAD_REQUEST: number = 400;
    private static readonly HTTP_STATUS_NOT_FOUND: number = 404;

    public retrieveSearchResponse(searchRequest: SearchRequest): Promise<RestApiResponse> {
        console.log(searchRequest);
        return this.getXmlHttpRequestPromise({
            method: "GET",
            url: `${this.getJointedTrackPartsResourceUrl()}?${jQuery.param(searchRequest)}`,
            successStatus: RestApi.HTTP_STATUS_OK,
            successEvent: RestApiResponseEvent.SearchResponseRetrieve,
            getEntity: (responseText: string) => {
                return new SearchResponse(JSON.parse(responseText));
            }
        });
    }

    public retrievePassport(id: number): Promise<RestApiResponse> {
        return this.getXmlHttpRequestPromise({
            method: "GET",
            url: this.getJointedTrackPartPassportResourceUrl(id),
            headers: [{ name: "Content-Type", value: "application/json" }],
            successStatus: RestApi.HTTP_STATUS_OK,
            successEvent: RestApiResponseEvent.PassportRetrieve,
            getEntity: (responseText: string) => {
                return new JointedTrackPartPassport(JSON.parse(responseText));
            }
        });
    }

    public retrieveJointedTrackPartById(id: number): Promise<RestApiResponse> {
        return this.getXmlHttpRequestPromise({
            method: "GET",
            url: this.getJointedTrackPartResourceUrl(id),
            headers: [{ name: "Content-Type", value: "application/json" }],
            successStatus: RestApi.HTTP_STATUS_OK,
            successEvent: RestApiResponseEvent.JointedTrackPartRetrieve,
            getEntity: (responseText: string) => {
                return new JointedTrackPart(JSON.parse(responseText));
            }
        });
    }

    public updateJointedTrackPart(jointedTrackPart: JointedTrackPart): Promise<RestApiResponse> {
        return this.getXmlHttpRequestPromise({
            method: "PUT",
            url: this.getJointedTrackPartResourceUrl(jointedTrackPart.getId()),
            data: JSON.stringify(jointedTrackPart.getJointedTrackPartWithoutId()),
            headers: [{ name: "Content-Type", value: "application/json" }],
            successStatus: RestApi.HTTP_STATUS_OK,
            successEvent: RestApiResponseEvent.JointedTrackPartUpdate,
            getEntity: (responseText: string) => {
                return new JointedTrackPart(JSON.parse(responseText));
            }
        });
    }

    public createJointedTrackPart(jointedTrackPart: JointedTrackPart): Promise<RestApiResponse> {
        return this.getXmlHttpRequestPromise({
            method: "POST",
            url: this.getJointedTrackPartsResourceUrl(),
            data: JSON.stringify(jointedTrackPart.getJointedTrackPartWithoutId()),
            headers: [{ name: "Content-Type", value: "application/json" }],
            successStatus: RestApi.HTTP_STATUS_CREATED,
            successEvent: RestApiResponseEvent.JointedTrackPartCreate,
            getEntity: (responseText: string) => {
                return new JointedTrackPart(JSON.parse(responseText));
            }
        });
    }

    public deleteJointedTrackPartById(id: number): Promise<RestApiResponse> {
        return this.getXmlHttpRequestPromise({
            method: "DELETE",
            url: this.getJointedTrackPartResourceUrl(id),
            headers: [{ name: "Content-Type", value: "application/json" }],
            successStatus: RestApi.HTTP_STATUS_OK,
            successEvent: RestApiResponseEvent.JointedTrackPartDelete,
            getEntity: (responseText: string) => {
                return new JointedTrackPart(JSON.parse(responseText));
            }
        });
    }

    public getJointedTrackPartPassportResourceUrl(id: number): string {
        return `${this.getJointedTrackPartResourceUrl(id)}${RestApi.PASSPORT_PATH}`;
    }

    private getXmlHttpRequestPromise(options: XmlHttpRequestPromiseOptions): Promise<RestApiResponse> {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(options.method, options.url);
            if (options.headers) {
                for (let header of options.headers) {
                    request.setRequestHeader(header.name, header.value);
                }
            }
            request.onload = () => {
                if (request.status === options.successStatus) {
                    let entity: RestApiEntity = options.getEntity(request.responseText);
                    if (entity.isConsistent()) {
                        let response: RestApiResponse = new RestApiResponse({
                            event: options.successEvent,
                            entity: entity
                        });
                        response.log();
                        resolve(response);
                    } else {
                        this.handleRequestError(request, reject, RestApiErrorEvent.InconsistentData);
                    }
                } else {
                    this.handleRequestError(request, reject);
                }
            };
            request.onerror = () => this.handleRequestError(request, reject);
            request.timeout = RestApi.TIMEOUT;
            request.ontimeout = () => this.handleRequestError(request, reject, RestApiErrorEvent.Timeout);
            request.send(options.data);
        });
    }

    private handleRequestError(
        request: XMLHttpRequest,
        reject: (response: RestApiError) => void,
        errorEvent?: RestApiErrorEvent,
    ): void {
        let event: RestApiErrorEvent;
        if (errorEvent) {
            event = errorEvent;
        } else if (request.status === RestApi.HTTP_STATUS_NOT_FOUND) {
            event = RestApiErrorEvent.NotFound;
        } else if (request.status === RestApi.HTTP_STATUS_BAD_REQUEST) {
            event = RestApiErrorEvent.BadRequest;
        } else {
            event = RestApiErrorEvent.OtherError;
        }

        let error: RestApiError = new RestApiError({
            event: event,
            request: request
        });
        error.log();
        reject(error);
    }

    private getJointedTrackPartResourceUrl(id: number): string {
        return `${this.getJointedTrackPartsResourceUrl()}/${id}`;
    }

    private getJointedTrackPartsResourceUrl(): string {
        return `${this.getRestApiUrl()}${RestApi.JOINTED_TRACK_PARTS_PATH}`;
    }

    private getRestApiUrl(): string {
        return `http://${document.location.hostname}:${RestApi.PORT}${RestApi.ROOT_PATH}`;
    }

}
