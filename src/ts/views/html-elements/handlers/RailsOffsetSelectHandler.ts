import { SelectHandler } from "./basic/SelectHandler";

export class RailsOffsetSelectHandler extends SelectHandler {

	private static readonly VALUES: string[] = ["Без забега", "Левый", "Правый"];

	public constructor() {
		super();
		this.update(RailsOffsetSelectHandler.VALUES);
	}

	public getOffsetFactor(): number {
		let offsetFactor: number;
		if (this.getValue() === RailsOffsetSelectHandler.VALUES[1]) {
			offsetFactor = -1;
		} else if (this.getValue() === RailsOffsetSelectHandler.VALUES[2]) {
			offsetFactor = 1;
		} else {
			offsetFactor = 0;
		}

		return offsetFactor;
	}

	public setOffsetSide(offset: number): void {
		if (offset < 0) {
			this.setValue(RailsOffsetSelectHandler.VALUES[1]);
		} else if (offset > 0) {
			this.setValue(RailsOffsetSelectHandler.VALUES[2]);
		} else {
			this.setValue(RailsOffsetSelectHandler.VALUES[0]);
		}
	}

}
