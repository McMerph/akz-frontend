import { JointedTrackPart } from "../domain/JointedTrackPart";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiError } from "../rest-api/RestApiError";
import { ViewModel } from "./ViewModel";

export class CreationModel extends ViewModel {

	public createJointedTrackPart(jointedTrackPart: JointedTrackPart): void {
		this.getRestApi().createJointedTrackPart(jointedTrackPart)
			.then((response: RestApiResponse) =>
				this.notifyRestApiResponseObservers(response))
			.catch((error: RestApiError) =>
				this.notifyRestApiErrorObservers(error));
	}

}
