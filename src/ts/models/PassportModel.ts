import { JointedTrackPartPassport } from "../domain/JointedTrackPartPassport";
import { RestApiResponse } from "../rest-api/RestApiResponse";
import { RestApiError } from "../rest-api/RestApiError";
import { ViewModel } from "./ViewModel";

export class PassportModel extends ViewModel {

    private jointedTrackPartPassport: JointedTrackPartPassport;

    public retrievePassport(id: number): void {
        this.getRestApi().retrievePassport(id)
            .then((response: RestApiResponse) => {
                //TODO Get rid of cast?
                this.jointedTrackPartPassport = (response.getEntity() as JointedTrackPartPassport);
                this.notifyRestApiResponseObservers(response);
            })
            //TODO Show password if inconsistent data? Show "---" if undefined or null properties?
            .catch((error: RestApiError) =>
                this.notifyRestApiErrorObservers(error));
    }

    public getJointedTrackPartPassport(): JointedTrackPartPassport {
        return this.jointedTrackPartPassport;
    }

}
