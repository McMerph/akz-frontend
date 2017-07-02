import { SearchRequest } from "../domain/SearchRequest";
import { SearchResponse } from "../domain/SearchResponse";
import { JointedTrackPartCompactRepresentation } from "../domain/JointedTrackPartCompactRepresentation";
import { JointedTrackPart } from "../domain/JointedTrackPart";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiError } from "../rest-api/RestApiError";
import { ViewModel } from "./ViewModel";

export class JournalModel extends ViewModel {

    private static readonly FROM_PREFIX = "Звенья с";
    private static readonly TO_PREFIX = "по";
    private static readonly COUNT_PREFIX = "из";

    private searchRequest: SearchRequest = new SearchRequest();
    private searchResponse: SearchResponse;

    private searchResponseRetrieving: boolean = false;

    public getJointedTrackPartPassportResourceUrl(jointedTrackPartCompactRepresentation: JointedTrackPartCompactRepresentation): string {
        let id: number = jointedTrackPartCompactRepresentation.getId();
        return this.getRestApi().getJointedTrackPartPassportResourceUrl(id);
    }

    public updateSearchResponse(): void {
        if (!this.searchResponseRetrieving) {
            this.searchResponseRetrieving = true;
            this.getRestApi().retrieveSearchResponse(this.searchRequest)
                .then((response: RestApiResponse) => {
                    //TODO Get rid of cast?
                    this.searchResponse = (response.getEntity() as SearchResponse);
                    this.notifyRestApiResponseObservers(response);
                    this.searchResponseRetrieving = false;
                })
                .catch((error: RestApiError) => {
                    this.notifyRestApiErrorObservers(error)
                    this.searchResponseRetrieving = false;
                });
        }
    }

    public deleteJointedTrackPart(id: number): void {
        this.getRestApi().deleteJointedTrackPartById(id)
            .then((response: RestApiResponse) => {
                this.updateSearchResponse();
                this.notifyRestApiResponseObservers(response);
            })
            .catch((error: RestApiError) =>
                this.notifyRestApiErrorObservers(error));
    }

    public previous(): boolean {
        let previous: boolean = this.hasPrevious();
        if (previous) {
            this.searchRequest.previous();
            this.updateSearchResponse();
        }

        return previous;
    }

    public next(): boolean {
        let next: boolean = this.hasNext();
        if (next) {
            this.searchRequest.next();
            this.updateSearchResponse();
        }

        return next;
    }

    public resetSearchRequest(): void {
        this.setSearchRequest(new SearchRequest());
    }

    public hasPrevious(): boolean {
        return (this.searchResponse.getCount() > 0) && this.searchRequest.getFirstResult() > 0;
    }

    public hasNext(): boolean {
        return (this.searchResponse.getCount() > 0) && this.searchResponse.getCount() > (this.searchRequest.getFirstResult() + this.searchRequest.getMaxResults());
    }

    public generateInfo(): string {
        let from: number = this.searchRequest.getFirstResult() + 1;
        let to: number = Math.min(this.searchRequest.getFirstResult() + this.searchRequest.getMaxResults(), this.searchResponse.getCount());
        let count: number = this.searchResponse.getCount();

        return `${JournalModel.FROM_PREFIX} ${from} ${JournalModel.TO_PREFIX} ${to} ${JournalModel.COUNT_PREFIX} ${count}`;
    }

    public getSearchRequest(): SearchRequest {
        return this.searchRequest;
    }

    public setSearchRequest(searchRequest: SearchRequest): void {
        this.searchRequest = searchRequest;
    }

    public getSearchResponse(): SearchResponse {
        return this.searchResponse;
    }

    public setSearchResponse(searchResponse: SearchResponse): void {
        this.searchResponse = searchResponse;
    }

}
