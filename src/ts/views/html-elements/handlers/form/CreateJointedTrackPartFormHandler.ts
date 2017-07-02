import { Icons } from "../../Icons";
import { ButtonHandler } from "../basic/ButtonHandler";
import { FormGroupHandler } from "../basic/form/FormGroupHandler";
import { FormHandler } from "../basic/form/FormHandler";
import { Router } from "../../../../Router";

export class CreateJointedTrackPartFormHandler extends FormHandler {

	private static readonly TEXT: string = " Добавить звено";

	public constructor() {
		super();

		this.embed(new FormGroupHandler()
			.embed(new ButtonHandler()
				.setSubmitType()
				.addDefaultStyle()
				.addBlockStyle()
				.addClonedNodes(Icons.PLUS)
				.addText(CreateJointedTrackPartFormHandler.TEXT)));

		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			Router.getInstance().routeToCreationView();
		});
	}

	protected getConcreteHandler(): CreateJointedTrackPartFormHandler {
		return this;
	}

}
