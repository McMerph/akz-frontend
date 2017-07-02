import { JointedTrackPart } from "../domain/JointedTrackPart";

export interface JointedTrackPartController {

	submit(jointedTrackPart: JointedTrackPart): void;

}