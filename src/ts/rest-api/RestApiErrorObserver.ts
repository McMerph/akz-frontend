import { RestApiError } from "../rest-api/RestApiError";

export interface RestApiErrorObserver {

	onError: (response: RestApiError) => void;

}
