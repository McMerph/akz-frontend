import { RestApiResponse } from "../rest-api/RestApiResponse";

export interface RestApiResponseObserver {

	onResponse: (response: RestApiResponse) => void;

}
