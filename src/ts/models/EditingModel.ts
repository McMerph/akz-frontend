import { JointedTrackPart } from "../domain/JointedTrackPart";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiError } from "../rest-api/RestApiError";
import { ViewModel } from "./ViewModel";

export class EditingModel extends ViewModel {

    private jointedTrackPart: JointedTrackPart;

    public retrieveJointedTrackPartById(id: number): void {
        this.getRestApi().retrieveJointedTrackPartById(id)
            .then((response: RestApiResponse) => {
                //TODO Get rid of cast?
                this.jointedTrackPart = (response.getEntity() as JointedTrackPart);
                this.notifyRestApiResponseObservers(response);
            })
            //TODO Let edit if inconsistent data? Initialize undefined or null properties with default values?
            .catch((error: RestApiError) =>
                this.notifyRestApiErrorObservers(error));
    }

    public updateJointedTrackPart(jointedTrackPart: JointedTrackPart): void {
        this.getRestApi().updateJointedTrackPart(jointedTrackPart)
            .then((response: RestApiResponse) => {
                //TODO Get rid of cast?
                this.jointedTrackPart = (response.getEntity() as JointedTrackPart);
                this.notifyRestApiResponseObservers(response);
            })
            .catch((error: RestApiError) =>
                this.notifyRestApiErrorObservers(error));
    }

    public getJointedTrackPart(): JointedTrackPart {
        return this.jointedTrackPart;
    }

}
